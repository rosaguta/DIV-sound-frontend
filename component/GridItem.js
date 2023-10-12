import React from 'react';
import styles from './GridItem.module.css';

const GridItem = ({ url }) => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  return (
    <div className={styles.gridItem}>
      <p>{lastPart}</p>
      <audio controls>
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default GridItem;