"use client";
import React, { useEffect, useState } from 'react';
import styles from './GridContainer.module.css';
import GridItem from './GridItem'; // corrected import statement

const GridContainer = ({ id }) => {
  const [audioUrls, setAudioUrls] = useState([]); // State to store audio URLs

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(`http://localhost:8080/Users/${id}/Audio`);
        const data = await response.json();
        setAudioUrls(data); // Update state with fetched audio URLs
      } catch (error) {
        console.error('Error fetching audio data:', error);
      }
    };

    fetchData(); // Fetch audio data when the component mounts
  }, [id]);

  return (
    <div className={styles.gridContainer}>
      {audioUrls.map((url, index) => (
        <GridItem key={index} url={url} /> // Generate GridItem components for each audio URL
      ))}
    </div>
  );
};

export default GridContainer;
