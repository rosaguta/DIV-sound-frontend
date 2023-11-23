'use client'
import React, { useState, useEffect } from 'react';
import GridContainer from '../../../component/GridContainer.client.js';
import FileUpload from '../../../component/FileUpload';
import Sidebar from '../../../component/sidebar.js';
import Styles from '../../../component/sidebar.module.css';
import Cookies from 'js-cookie';

export default function Page() {
  let userData = Cookies.get('user');
  let parseddata = '';
  const [userid, setUserId] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        parseddata = JSON.parse(userData);
        setUserId(parseddata.id);
        setUsername(parseddata.username);

        const response = await fetch(`${process.env.NEXT_PUBLIC_AUDIO_API}/Boards?userid=${parseddata.id}`);
        const data = await response.json();
        setJsonData(data);
      } catch {
        window.location.href = '/';
      }
    };

    if (userData !== 'NOT FOUND') {
      fetchData();
    }
  }, [userData]);

  if (!jsonData) {
    return <div>Loading...</div>;
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
