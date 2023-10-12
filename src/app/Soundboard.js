"use client";
import React from 'react';
import GridContainer from '../../component/GridContainer.client.js';
import FileUpload from '../../component/FileUpload.js';
import Login from '../../component/FileUpload.js';


const Soundboard = () => {
  return (
    <div>
      <Login />
      <h1>Grid Layout Example</h1>
      <FileUpload />
      <GridContainer id='3' />
    </div>
  );
};

export default Soundboard;
