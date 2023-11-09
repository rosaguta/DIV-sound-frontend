'use client'
import React from 'react';
import Login from '../../component/login.js';
import Link from 'next/link.js';


const Home = () => {
  return (
    <div>
      <Login />
      <Link href='/new'>Register</Link>
    </div>

  );
};

export default Home;
