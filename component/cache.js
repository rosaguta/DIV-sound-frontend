import { useEffect } from 'react';

const cache = ({data}) => {
  useEffect(() => {
    // Set data to local storage
    localStorage.setItem('auth', data);

    // Get data from local storage
    const storedValue = localStorage.getItem('auth');
    console.log('Stored Value:', storedValue);
  }, []);

  return;
};

export default cache;