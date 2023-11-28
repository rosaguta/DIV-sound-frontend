"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../component/sidebar';
import GridContainerBoard from '../../../../component/GridContainerBoard.client';
import Cookies from 'js-cookie';
import DeleteBoard from '../../../../component/DeleteBoard';
import ShareButton from '../../../../component/sharebutton';


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
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUDIO_API}/Boards?userid=${userid}`);
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
    <div className="flex">
      <div className="flex-none">
          <Sidebar boards={jsonData} username={username} className="mr-100" />
          <div className='flex-grow'>
            <GridContainerBoard json={jsonData.find(item => item.id === Number(urlid))} url={urlid} />
          </div>
          <div className='absolute top-4 right-4'>
            <ShareButton boardid={urlid} />
            <DeleteBoard boardid={urlid} />
          </div>
      </div>
    </div>
  );
};


