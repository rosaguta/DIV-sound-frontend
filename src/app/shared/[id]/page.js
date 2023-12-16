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

  let s = io(process.env.NEXT_PUBLIC_SOCKET)
  s.on("userjoined", (ulist) => {
    console.log("something")
    setUserlist(ulist.split(","))
    console.log("ulist: " + ulist)
  })

  s.on('executeCode', (url) => {

    playOrStopAudio(url)
  });


  const connectsocket = () => {
    s.emit('joinroom', urlid, "user");
    return s;
  };

  useMemo(() => connectsocket(), []);

  useEffect(() => {
    s.on("userjoined", (ulist) => {
      console.log("something");
      const updatedUserlist = ulist.split(',');
      console.log("userlist: " + updatedUserlist);
      setUserlist(updatedUserlist); // Update the state here
    });

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
  }, [urlid]);

  if (jsondata == null) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};