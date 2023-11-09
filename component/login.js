'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook from Next.js
import Cookies from 'js-cookie';

const Login = () => {
  const router = useRouter(); // Use the useRouter hook inside the functional component

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Users/Login?username=${username}&Password=${password}`);
      const data = await response.json();

      if (data.statusCode === 200) {
        // Successful login, redirect to /soundboard
        Cookies.set('user', JSON.stringify(data.user), { expires: 1 });
        router.push('/soundboard'); // Use router.push inside the component body
        // console.log('Login successful:', data.user);
      } else {
        // Unauthorized, handle error (show error message, etc.)
        console.error('Login failed:', data.message);
        setErrorMessage("Login failed bitch")
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src='https://git.digitalindividuals.com/uploads/-/system/appearance/header_logo/1/div_logo_2.png'
            className="max-w-xs mb-4"
      />
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <input
        className="mb-4 p-2 border border-gray-300 rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="mb-4 p-2 border border-gray-300 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;