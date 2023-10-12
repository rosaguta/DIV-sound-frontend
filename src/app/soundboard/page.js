"use client";
import React from 'react';
import GridContainer from '../../../component/GridContainer.client.js';
import FileUpload from '../../../component/FileUpload';

export default function Page() {
  return <div><h1>Hello, Next.js!</h1>
    <h1>Grid Layout Example</h1>
    <FileUpload />
    <GridContainer id='3' />

  </div>
}

