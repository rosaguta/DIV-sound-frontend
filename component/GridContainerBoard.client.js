"use client";
import React from 'react';
import styles from './GridContainer.module.css';
import GridItem from './GridItem';

const GridContainerBoard = ({ json }) => {
  // Check if json.audioList is an array before using map
  const audioList = json.audioList?.length > 0 ? json.audioList : [];

  // Check if the ID of the first item in audioList is null
  const isFirstItemNull = audioList.length > 0 && audioList[0].id === null;

  return (<div>
    <h2>{json.name}</h2>
    <div className={styles.gridContainer}>

      {/* Check if the ID of the first item is not null before rendering GridItem */}
      {!isFirstItemNull && audioList.map((audio) => (
        <GridItem url={audio.url} key={audio.id} fileid={audio.id}/>
      ))}
    </div>
  </div>
  );
};

GridContainerBoard.defaultProps = {
  json: {
    name: '',  // Default value for name property
    audioList: []  // Default value for audioList property
  }
};
export default GridContainerBoard;
