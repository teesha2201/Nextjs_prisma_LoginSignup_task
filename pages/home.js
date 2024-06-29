import React, { useState ,useEffect } from 'react';
import Link from 'next/link';
import "../styles/styles.css";
import { useRouter } from 'next/router';


export default function Home() {
    const router = useRouter();
    const userName = useState('')
    const handleLogout =()=>{
        localStorage.removeItem("Login");
        router.push('/login');
    }
 useEffect (()=>{
    const data = localStorage.getItem("user");
    console.log("data",data);
 },[userName])
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='text-2xl font-bold text-center text-blue-500 mb-13'>{userName}&nbsp;</h1>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
        
         Logout

        </button>
    </div>
  )
}

