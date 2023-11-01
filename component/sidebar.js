import React from 'react';
import Link from 'next/link';
import Styles from './sidebar.module.css'
import GetBoards from './GetBoards' 

const Sidebar = ({boards}) => {
  return (
    <div className={Styles.sidebar}>
      <img src='https://git.digitalindividuals.com/uploads/-/system/appearance/header_logo/1/div_logo_2.png'></img>
      {/* <h2>Soundboards</h2> */}
      <Link href='/soundboard'>
        <h2>All Files</h2>
      </Link>
      <GetBoards Boards={boards}/>
      <ul>
        <li>
          <Link href="/soundboard/create">
            <p>Create Soundboard</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;