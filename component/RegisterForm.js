'use client'
import React, { useState } from 'react';
import styles from './NewSoundBoard.module.css'
const NewUserForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        mail: '',
        passhash: ''
      });
      const [responseMessage, setResponseMessage] = useState('');
    
      const handleSubmit = async (e) => {
        e.preventDefault();
     
        try {
          const response = await fetch(`http://localhost:8080/Users/Register}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (response.status === 200) {
            setResponseMessage('User created successfully!');
            window.location.href = '/';
          } else {
            setResponseMessage('Error: Unable to create user.');
          }
      
          console.log('API Response:', response.status);
        } catch (error) {
          console.error('Error:', error);
          setResponseMessage('Error: Unable to create user.');
        }
      };
    
      const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    return(
        <div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h1 className={styles.h1}>New User</h1>
          <label className={styles.label}>
            Firstname:
            <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} className={styles.input} />
          </label>
          <br />
          <label className={styles.label}>
            Lastname:
            <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} className={styles.input} />
          </label>
          <br />
          <label className={styles.label}>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} className={styles.input} />
          </label>
          <br />
          <label className={styles.label}>
            Mail:
            <input type="mail" name="mail" value={formData.mail} onChange={handleInputChange} className={styles.input} />
          </label>
          <br />
          <label className={styles.label}>
            Password:
            <input type="password" name="password" value={formData.passhash} onChange={handleInputChange} className={styles.input} />
          </label>
          <br />
          <button  type="submit" className={styles.button}>Submit</button>
          <div className={styles.responseMessage}>{responseMessage}</div>
        </form>
      </div>  
    )
}

export default NewUserForm