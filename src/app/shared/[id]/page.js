'use client'
import React, { useEffect, useState, useMemo } from 'react';
import GridContainerBoard from '../../../../component/GridContainerBoard.client.js';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation.js';
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
  const s = io(process.env.NEXT_PUBLIC_SOCKET)
  const router = useRouter()
  const [AudioListIsEmpty, setIsEmpty] = useState(true)


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
    s.on("userlist", (ulist) => {
      console.log("something")
      setUserlist(ulist)
      console.log("ulist: " + ulist)
    })
  };
  function disconnectsession(room, username) {
    s.emit('userdisconnect', room, username)
  }

  const beforeUnloadHandler = (event) => {
    event.preventDefault()
    const confirmationMessage = 'Are you sure you want to leave?';
    event.returnValue = confirmationMessage; // Standard for most browsers

    disconnectsession(urlid, userName)
    return confirmationMessage; // For some older browsers
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
        if(data.id == 0){
          router.back()
        }
        const audiolistlenght = data.audioList.length 
        console.log(audiolistlenght)
        if(data.audioList.length > 1){
          setIsEmpty(false)
          console.log(AudioListIsEmpty)
        } 
        setJson(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getBoard();
    window.addEventListener('beforeunload', beforeUnloadHandler)
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
    }
  }, [urlid, userName, AudioListIsEmpty]);

  if (jsondata == null) {
    return <div>Loading...</div>;
  }

  
  return (
    <div>
      {!submitted ? (
        <div className="flex flex-col items-center justify-center">
          <img src='https://git.digitalindividuals.com/uploads/-/system/appearance/header_logo/1/div_logo_2.png'
            className="max-w-xs mb-4"
          />
          <form onSubmit={handleNameSubmit}>
            <label>
              Enter your name:
              <input
                className="mb-4 p-2 border border-gray-300 rounded"
                type="text"
                placeholder="Username"
                value={userName}
                onChange={handleNameChange}
              />
            </label>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded" type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div class="flex">
          {AudioListIsEmpty ? (
            <p>The soundboard is empty</p>
          ) : (
            <GridContainerBoard json={jsondata} socket={s}></GridContainerBoard>
          )}
          <div class="mr-4">
            <h2>Connected Users:</h2>
            <ul>
              {userlist.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};