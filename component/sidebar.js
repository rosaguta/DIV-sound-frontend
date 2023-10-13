import React from 'react';
import Link from 'next/link';
import Styles from './sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={Styles.sidebar}>
      <h2>Soundboards</h2>
      <ul>
        <li>
          <Link href="/soundboard/create">
            <p>Create Soundboard</p>
          </Link>
        </li>
        {/* Add more menu items for different actions (edit, delete, etc.) */}
      </ul>
    </div>
  );
};

export default Sidebar;