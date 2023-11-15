"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../component/sidebar';
import GridContainerBoard from '../../../../component/GridContainerBoard.client';
import Styles from '../../../../component/sidebar.module.css'
import Cookies from 'js-cookie';
import DeleteBoard from '../../../../component/DeleteBoard';
import ShareButton from '../../../../component/sharebutton';
import io from 'socket.io-client'

export default function Page({ params }) {
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
          <Sidebar boards={jsonData} username={username}/>
        </div>
        <div className={Styles.mainContent}>
          <GridContainerBoard json={jsonData.find(item => item.id === Number(urlid))} url={urlid}/>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};


