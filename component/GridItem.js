import React, { Fragment } from 'react';
import styles from './GridItem.module.css';
import DropDown from './dropdown';
import DeleteButton from './deleteFile'

const GridItem = ({ url, boardnames, fileid}) => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];

  
  return (
    <div className={styles.gridItem}>
      <DropDown boards={boardnames} audiofileid={fileid}></DropDown>
      <p>{lastPart}</p>
      <audio controls>
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div>
        <DeleteButton audiofileid={fileid}/>
      </div>
    </div>
  );
};

export default GridItem;