"use client";
import React, { useEffect, useState } from 'react';
import styles from './GridContainer.module.css';
import GridItem from './GridItem'; // corrected import statement

const GridContainer = ({ id }) => {
  const [audioUrls, setAudioUrls] = useState([]); // State to store audio URLs
  const [boardNames, setBoardNames] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`http://localhost:8080/AudioFiles/${id}`);
        const data = await response.json();
        setAudioUrls(data); // Update state with fetched audio URLs

        const boardResponse = await fetch(`http://localhost:8080/Boards?userid=${id}`);
        const boardData = await boardResponse.json();
        setBoardNames(boardData); // Set board names from the response to state
      } catch (error) {
        console.error('Error fetching audio data:', error);
      }
      console.log(audioUrls.toString())
    };

    fetchData(); // Fetch audio data when the component mounts
  }, [id]);

  return (
    <div className={styles.gridContainer}>
      <script>console.log(audioUrls)</script>
      {audioUrls.map((audio) => (
        <GridItem key={audio.id} url={audio.url} boardnames={boardNames} fileid={audio.id} />
      ))} 
    </div>
  );
};

export default GridContainer;
