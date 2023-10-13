"use client"
import React from 'react';
import GridContainer from '../../../component/GridContainer.client.js';
import FileUpload from '../../../component/FileUpload';
import Sidebar from '../../../component/sidebar.js';
import Styles from '../../../component/sidebar.module.css';

export default function Page() {
  return (
    <div className={Styles.container}>
      <div className={Styles.sidebar}>
        <Sidebar />
      </div>
      <div className={Styles.mainContent}>
        <FileUpload />
        <GridContainer id='3' />
      </div>
    </div>
  );
}
