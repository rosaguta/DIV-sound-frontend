import React, { Fragment } from 'react';
import styles from './GridItem.module.css';
import DropDown from './dropdown';
import DeleteButton from './deleteFile'
import RemoveFromBoardButton from './removefile';
import AudioPlayer from './audioplayer';

const GridItem = ({ url, boardnames, fileid }) => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];

  const currentUrl = window.location.href;
  // console.log(currentUrl);
  const currentUrlParts = currentUrl.split('/');
  const lastCurrentUrlPart = currentUrlParts[currentUrlParts.length - 1];
  // console.log(lastCurrentUrlPart);

  const lastCurrentUrlPartAsNumber = parseInt(lastCurrentUrlPart, 10); // or +lastCurrentUrlPart;
  const isInt = Number.isInteger(lastCurrentUrlPartAsNumber);

  
  // console.log(isInt);
  // console.log("fileid : " + fileid)
  let buttonComponent;
  if (!currentUrl.includes('shared')){
  if (isInt) {
    buttonComponent = <RemoveFromBoardButton audiofileid={fileid} boardid={lastCurrentUrlPartAsNumber} />;
  } else {
    buttonComponent = <DeleteButton audiofileid={fileid} />;
  }
}


  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md">
      <DropDown boards={boardnames} audiofileid={fileid}></DropDown>
      <p className="text-lg font-semibold">{lastPart}</p>
      <AudioPlayer src={url}></AudioPlayer>
      {/* <audio className="mt-4" controls>
        <source src={url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> */}
      <div className="mt-4">
        {buttonComponent}
      </div>
    </div>
  );
};

export default GridItem;