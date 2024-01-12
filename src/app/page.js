'use client'
import React from 'react';
import Login from '../../component/login.js';
import Link from 'next/link.js';
import TWEEN from '@tweenjs/tween.js'


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-8">
        <Login />
      </div>
      <div className='text-blue-500'> 
        <Link href='/new'>Register</Link>
      </div>
    </div>

  );
};

export default Home;
