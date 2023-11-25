'use client'
import React, { useEffect, useState, useMemo } from 'react';
import GridContainerBoard from '../../../../component/GridContainerBoard.client.js';
import io from 'socket.io-client';
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
  const urlid = params.id

  const connectsocket = () => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET)
    socket.emit('joinroom', urlid)

    socket.on('executeCode', (url) => {
    
      playOrStopAudio(url)
    });
    return socket
  };
  const s = useMemo(() => connectsocket(), []);


  useEffect(() => {
    const getBoard = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUDIO_API}/Boards/Session/${urlid}`);
        if (!response.ok) {
          location
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setJson(data);


        // const s = useMemo(() => connectsocket(),[]);


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getBoard();
  }, [urlid]);


  if (!jsondata) {

    return <div>Loading...</div>; // or a loading spinner, etc.
  }

  return (
    <div>
      <GridContainerBoard json={jsondata} socket={s}></GridContainerBoard>
    </div>
  );
};
