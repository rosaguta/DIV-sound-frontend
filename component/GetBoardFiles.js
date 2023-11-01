'use client'
import styles from './GridContainer.module.css';
import React, { useState, useEffect } from 'react';
import GridItem from './GridItem';

const BoardFilesComponent = ({userid}) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Boards?userid=${userid}`);
        const data = await response.json();

        const filtereddata = data.filter(board => board.id === 6)
        // Extracting only name and id from the API response
        const formattedBoards = filtereddata.map(board => ({
          id: board.id,
          name: board.name,
          audioList: board.audioList // Extracting audioList directly from the API response
        }));
        setBoards(formattedBoards);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures effect runs once after initial render

  return (
    <div className={styles.gridContainer}>
    {/* Check if boards is not empty before accessing audioList */}
    {boards.length > 0 && boards[0].audioList.map((url, id) => (
      <GridItem key={id} url={url.url}/> 
    ))}
</div>
  );
};

export default BoardFilesComponent;
