import React, { useState } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles([...selectedFiles]);
  };

  const handleUpload = async () => {
    const userData = Cookies.get('user');
    const parseddata = JSON.parse(userData);
    const userid = parseddata.id;

    if (files.length > 0) {
      setIsLoading(true); // Set loading state to true when starting the upload

      const formData = new FormData();

      // Append each file to the FormData object with the same key
      files.forEach((file, index) => {
        formData.append(`formFiles`, file);
      });

      try {
        const response = await fetch(`http://localhost:8080/AudioFiles?Uploaderid=${userid}`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Files uploaded successfully!');
          location.reload();
        } else {
          console.error('Failed to upload files');
        }
      } catch (error) {
        console.error('Error uploading files:', error);
      } finally {
        setIsLoading(false); // Reset loading state to false after the upload is completed or failed
      }
    } else {
      console.error('No files selected!');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        disabled={isLoading}
      >
        Upload
      </button>

      {isLoading && <p className="mt-4 text-blue-500">Uploading files...</p>}
    </div>
  );
};

export default FileUpload;
