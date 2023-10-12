"use client";
import React from 'react';
import GridContainer from '../../component/GridContainer.client.js';
import FileUpload from '../../component/FileUpload.js';
// import Login from '../../component/login.js';
import Signin from './pages/singin.js';
import { useRouter } from 'next/navigation';


const Home = () => {
  const router = useRouter();
  return (
    <div>
      <button type="button" onClick={() => router.push('/Soundboard')}>
        Click me
      </button>
      <Signin />
      {/* <h1>Grid Layout Example</h1>
      <FileUpload />
      <GridContainer id='3' /> */}
    </div>

  );
};

export default Home;
