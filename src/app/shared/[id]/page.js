'use client'
import React, { useEffect, useState } from 'react';
import GridContainerBoard from '../../../../component/GridContainerBoard.client';
// import { Socket } from 'socket.io';

export default function Page({ params }) {
  const [json, setJson] = useState(null);
  const getBoard = async () => {
    try {
      console.log("sessionid", params.id);
      const response = await fetch(`http://localhost:8080/Boards/Session/${params.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.text();
      setJson(data);
      console.log("json:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getBoard();
  }, []);
  return (
    <div>
      <GridContainerBoard json={json}></GridContainerBoard>
    </div>
  );
}
