"use client"; // Mark this component as a client component

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "../styles/styles.css";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', { identifier, password });
      console.log("Login response:", response);
      if(response.status == 401){
        alert('Invalid email/username or password')
      }
      else if(response.status == 200){
        localStorage.setItem("Login",true);
        alert('Logged in successfully')
        router.push('/home');
      }
      else if(response.status == 500){
        alert('Internal Server Error')
      }
     
      console.log(response.data.message);
      
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div>
            {/* <label htmlFor="identifier" className="block mb-2">Username or Email</label> */}
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              placeholder='Username or Email'
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            {/* <label htmlFor="password" className="block mb-2">Password</label> */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
              className="border p-2 rounded w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
        <p className="mt-4 text-center text-blue-500">
          Don't have an account? <Link href="/">Signup</Link>
        </p>
      </div>
    </div>
  );
}
