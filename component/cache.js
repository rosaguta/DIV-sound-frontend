import { useEffect, useState } from 'react';
import { fetchDataFromAPI, getFromCache, saveToCache } from '../utils/cache'; // Import your cache utility functions

const cache = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      // Check if data is in the cache
      const cachedData = getFromCache('yourCacheKey');

      if (cachedData) {
        setData(cachedData);
      } else {
        // If data is not in the cache, fetch it from your API or database
        const fetchedData = await fetchDataFromAPI();
        setData(fetchedData);

        // Save the data to the cache for future use
        saveToCache('yourCacheKey', fetchedData);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  return (
    <div>
      {/* Render your component using the 'data' state */}
      {/* For example: */}
      {/* {data.map(item => <YourComponentItem key={item.id} item={item} />)} */}
    </div>
  );
};

export default cache;
