"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../component/sidebar';
import GridContainerBoard from '../../../../component/GridContainerBoard.client';
import Styles from '../../../../component/sidebar.module.css'
import Cookies from 'js-cookie';
import DeleteBoard from '../../../../component/DeleteBoard';

export default function Page({ params }) {
  const userData = Cookies.get('user')

  const parseddata = JSON.parse(userData)
  const userid = parseddata.id

  const [jsonData, setJsonData] = useState(null);
  const urlid = params.id
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

  // Now you can use jsonData in your components, for example:

  return (
    <div>
      <div className={Styles.container}>
        <div>
          <Sidebar boards={jsonData} />
        </div>
        <div className={Styles.mainContent}>
          <GridContainerBoard json={jsonData.find(item => item.id === Number(urlid))} />
        </div>
        <div>
          <DeleteBoard boardid={urlid}/>
        </div>
      </div>
    </div>
  );
};


