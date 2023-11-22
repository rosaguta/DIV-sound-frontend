'use client'
import React, { useEffect, useState } from 'react';
import GridContainerBoard from '../../../../component/GridContainerBoard.client.js';
// import { Socket } from 'socket.io';

export default function Page({ params }) {
  const [jsondata, setJson] = useState(null);
  const urlid = params.id
  useEffect(() => {
    const getBoard = async () => {
      try {
        console.log("sessionid", urlid);
        const response = await fetch(`http://localhost:8080/Boards/Session/${urlid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setJson(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getBoard();
  }, []);

  if (!jsondata) {
    return <div>Loading...</div>; // or a loading spinner, etc.
  }

  return (
    <div>
      <GridContainerBoard json={jsondata}></GridContainerBoard>
    </div>
  );
}
