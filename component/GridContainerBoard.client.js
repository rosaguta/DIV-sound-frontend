"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from './GridContainer.module.css';
import GridItem from './GridItem';
import DeleteBoard from './DeleteBoard';
import ShareButton from './sharebutton';
import io from 'socket.io-client';
const GridContainerBoard = ({ json, url }) => {
  // Check if json.audioList is an array before using map
  console.log('json:', json)
  const audioList = json.audioList?.length > 0 ? json.audioList : [];

  // Check if the ID of the first item in audioList is null
  const isFirstItemNull = audioList.length > 0 && audioList[0].id === null;

  const currenturl = window.location.href
  let socket
  
  if (currenturl.includes('shared')) {
    useEffect(() => {
      console.log("wtf")
      const parts = currenturl.split('/');
      const lastPart = parts[parts.length - 1];
      socket = io('http://localhost:3000')
      socket.emit('joinroom', lastPart)

      socket.on('executeCode', (code) => {
        eval(code)
      })
    }, [])
  }
  return (<div>
    <div className='columns-3'>
      <h2 className='text-xl font-extrabold '>{json.name}</h2>
      {/* <ShareButton/>
      <DeleteBoard boardid={url}/> */}

    </div>
    <div className={styles.gridContainer}>

      {/* Check if the ID of the first item is not null before rendering GridItem */}
      {!isFirstItemNull && audioList.map((audio) => (
        <GridItem url={audio.url} key={audio.id} fileid={audio.id} socket={socket} />
      ))}
    </div>
  </div>
  );
};

GridContainerBoard.defaultProps = {
  json: {
    name: '',  // Default value for name property
    sessionid: '',
    audioList: []  // Default value for audioList property
  }
};
export default GridContainerBoard;
