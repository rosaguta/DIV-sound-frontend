import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook from Next.js
import getStaticProps from './cache'

const Login = () => {
  const router = useRouter(); // Use the useRouter hook inside the functional component

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/Users/Login?email=${username}&Password=${password}`);
      const data = await response.json();

      if (data.statusCode === 200) {
        // Successful login, redirect to /soundboard
        router.push('/soundboard'); // Use router.push inside the component body
        console.log('Login successful:', data.user);
        getStaticProps(data)
      } else {
        // Unauthorized, handle error (show error message, etc.)
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
