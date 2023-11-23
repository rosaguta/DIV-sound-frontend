'use client'
import React, { useEffect, useState, useMemo } from 'react';
import GridContainerBoard from '../../../../component/GridContainerBoard.client.js';
import io from 'socket.io-client';

export default function Page({ params }) {
  const [jsondata, setJson] = useState(null);
  const urlid = params.id
  const connectsocket = () => {
    const socket = io('http://localhost:3000')
      socket.emit('joinroom', urlid)

      socket.on('executeCode', (code) => {
        eval(code)
        console.log("wtf")
        console.log(code)
      })
      return socket
    };
  const s = useMemo(() => connectsocket(),[]);

  

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



            socket.emit('joinroom', urlid)

            socket.on('executeCode', (code) => {
              eval(code)
              console.log("wtf")
              console.log(code)
            })

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
  }
