import { useState } from 'react';
import Router from 'next/router'
import Cookies from 'js-cookie';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    // const router = useRouter()
    const userData = Cookies.get('user')

    const parseddata = JSON.parse(userData)
    const userid = parseddata.id
    if (file) {
      const formData = new FormData();
      formData.append('formFile', file);

      try {
        const response = await fetch(`http://localhost:8080/AudioFiles?Uploaderid=${userid}`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('File uploaded successfully!');
          location.reload()

          // Router.reload(window.location.pathname);
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('No file selected!');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
