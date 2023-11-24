import React from 'react';
import Link from 'next/link';
import GetBoards from './GetBoards'
import Logout from './Logout';

const Sidebar = ({ boards, username }) => {
  return (
    <div className="w-48 h-screen bg-gray-800 text-white p-5 sticky-left-0 fixed">
      <img src="https://git.digitalindividuals.com/uploads/-/system/appearance/header_logo/1/div_logo_2.png" alt="Logo" className="mb-5" />
      <Link href="/soundboard">
        <h2 className="text-xl mb-5 cursor-pointer hover:underline">All Files</h2>
      </Link>
      <GetBoards Boards={boards} />
      <Link href="/soundboard/create">
          <p className="cursor-pointer hover:underline">Create Soundboard</p>
        </Link>
      <div className="absolute bottom-0 mb-8 text-lg">
        <p>Hello {username}</p>
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
