"use client"
import React, { useState, useEffect } from 'react';
import GridContainer from '../../../component/GridContainer.client.js';
import FileUpload from '../../../component/FileUpload';
import Sidebar from '../../../component/sidebar.js';
import Styles from '../../../component/sidebar.module.css';
import Cookies from 'js-cookie';

export default function Page() {
  const userData = Cookies.get('user')

  const parseddata = JSON.parse(userData)
  const userid = parseddata.id
  // if (userData) {
    const [jsonData, setJsonData] = useState(null);
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
  // }
  return (
    <div className={Styles.container}>
      <div>
        <Sidebar boards={jsonData} />
      </div>
      <div className={Styles.mainContent}>
        <FileUpload />
        <GridContainer id={userid} />
      </div>
    </div>
  );
}
