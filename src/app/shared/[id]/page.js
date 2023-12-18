'use client'
import React, { useEffect, useState, useMemo } from 'react';
import GridContainerBoard from '../../../../component/GridContainerBoard.client.js';
import { io } from 'socket.io-client';
// Create an audio element
const audioElement = new Audio();

// Store the currently playing URL
let currentUrl = null;

function playOrStopAudio(url) {
  // If the same URL is already playing, stop it
  if (currentUrl === url && !audioElement.paused) {
    audioElement.currentTime = 0;
    currentUrl = null;
  } else {
    // Set the new URL and play it
    audioElement.src = url;
    audioElement.play();
    currentUrl = url;
  }
}

export default function Page({ params }) {
  const [jsondata, setJson] = useState(null);
  const [userlist, setUserlist] = useState([]); // Use useState for userlist
  const urlid = params.id;
  const [userName, setUserName] = useState("")
  const [submitted, setSubmit] = useState(false)
  let s = io(process.env.NEXT_PUBLIC_SOCKET)


  s.on('executeCode', (url) => {
    playOrStopAudio(url)
  });

  const handleNameChange = (event) => {
    event.preventDefault()
    setUserName(event.target.value);
  };
  const handleNameSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true)
    connectsocket(userName)
    s.emit('getuserlist', urlid)
    s.on("userjoined", (ulist) => {
      console.log("something")
      setUserlist(ulist)
      console.log("ulist: " + ulist)
    })
  };

  const handleBeforeUnload = () => {
    console.log("disconnecting")
    s.emit('disconnect', userName, urlid);
  };
  
  function connectsocket(name) {
    s.emit('joinroom', urlid, name);
    return s;
  };

  useEffect(() => {

    const getBoard = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUDIO_API}/Boards/Session/${urlid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setJson(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getBoard();

    // Add event listener for beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);}
  }, [urlid]);

  if (jsondata == null) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleNameSubmit}>
          <label>
            Enter your name:
            <input type="text" value={userName} onChange={handleNameChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <div>
            <h3>Connected Users:</h3>
            <ul>
              {userlist.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
          <GridContainerBoard json={jsondata} socket={s}></GridContainerBoard>
        </div>
      )}
    </div>
  );
};