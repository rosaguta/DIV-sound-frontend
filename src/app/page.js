"use client";
import React from 'react';
import GridContainer from '../../component/GridContainer.client.js';
import FileUpload from '../../component/FileUpload.js';
import Login from '../../component/login.js';
// import Signin from './soundboard/page.js';
import { useRouter } from 'next/navigation';


const Home = () => {
  const router = useRouter();
  return (
    <div>
      <Login />
      {/* <h1>Grid Layout Example</h1>
      <FileUpload />
      <GridContainer id='3' /> */}
    </div>

  );
};

export default Home;
