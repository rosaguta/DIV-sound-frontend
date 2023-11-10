"use client"
import React, { useState, useEffect } from 'react';
import GridContainer from '../../../component/GridContainer.client.js';
import FileUpload from '../../../component/FileUpload';
import Sidebar from '../../../component/sidebar.js';
import Styles from '../../../component/sidebar.module.css';
import Cookies from 'js-cookie';

export default function Page() {
  let userData = ''
  let parseddata = ''
  let userid = ''
  let username = ''
  try {
    userData = Cookies.get('user')
    parseddata = JSON.parse(userData)
    userid = parseddata.id
    username = parseddata.username
  } catch {
    userData = 'NOT FOUND'
  }

  const [jsonData, setJsonData] = useState(null);
  if (userData !== 'NOT FOUND') {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/Boards?userid=${userid}`);
          const data = await response.json();
          setJsonData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []); // The empty dependency array ensures that this effect runs once after the initial render

    if (!jsonData) {
      return <div>Loading...</div>; // or a loading spinner, etc.
    }
  }
  else {
    window.location.href = '/'
  }
  return (
    <div className={Styles.container}>
      <div>
        <Sidebar boards={jsonData} username={username} />
      </div>
      <div className={Styles.mainContent}>
        
        <GridContainer id={userid} />
        <FileUpload />
      </div>
    </div>
  );
}
