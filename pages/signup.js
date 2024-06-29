"use client"; 
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import "../styles/styles.css";
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', { name, email, password });
      console.log(response.data.message);
      
      if(response.status == 401){
        alert('Invalid email/username or password')
      }
      else if(response.status == 201){
        alert('User created successfully')
        router.push('/login');
        // return;
      }
      else if(response.status == 200){
        alert('User created successfully')
        router.push('/login');
        // return;
      }
      else if(response.status == 400){
        alert('User already exists with this email. Please register with another email.')
      }
      
      
      else if(response.status == 500){
        alert('Internal Server Error')
      }
      router.push('/login');
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
        </form>
        <p className="mt-4 text-blue-500">
        Don't have an account? <Link href="/login">Login</Link>
      </p>
      </div>
    </div>
  );
}

