"use client";
import React from 'react';
import GridContainer from '../../component/GridContainer.client.js';
import FileUpload from '../../component/FileUpload.js';
import Login from '../../component/login.js';
// import Signin from './soundboard/page.js';
import { useRouter } from 'next/navigation';


const Home = () => {
  return (
    <div>
      <Login />
    </div>

  );
};

export default Home;
