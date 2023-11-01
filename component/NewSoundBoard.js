import React, { useState } from 'react';
import styles from '../component/NewSoundBoard.module.css'
import Cookies from 'js-cookie' 

const CreateBoard = () => {
  const [formData, setFormData] = useState({
    boardname: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = Cookies.get('user');
    const parseddata = JSON.parse(userData);
    const userid = parseddata.id;
  
    try {
      const response = await fetch(`http://localhost:8080/Boards?name=${formData.boardname}&userid=${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 200) {
        setResponseMessage('Board created successfully!');
        window.location.href = '/soundboard';
      } else {
        setResponseMessage('Error: Unable to create board.');
      }
  
      console.log('API Response:', response.status);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error: Unable to create board.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1 className={styles.h1}>Create SoundBoard</h1>
        <label className={styles.label}>
          Name:
          <input type="text" name="boardname" value={formData.boardname} onChange={handleInputChange} className={styles.input} />
        </label>
        <br />
        <button  type="submit" className={styles.button}>Submit</button>
        <div className={styles.responseMessage}>{responseMessage}</div>
      </form>
    </div>
  );
};

export default CreateBoard;
