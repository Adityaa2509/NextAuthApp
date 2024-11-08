"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'  // This import is correct for Next.js 15
import Link from 'next/link'

function Page() {
  const router = useRouter();  // Define useRouter at the top level of the component

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      console.log("coming cominh")
      const resp = await axios.post("/api/users/signup", user);
      console.log("SignUp Success", resp.data);
      router.push('/login');
    } catch (err: any) {
      console.log("Signup Failed:", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setBtnDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 gap-4'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className='rounded-lg focus:outline-none border-gray-300 text-black pl-7 p-2 text-xl'
        placeholder='Username' />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className='rounded-lg focus:outline-none border-gray-300 text-black pl-7 p-2 text-xl'
        placeholder='Email' />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className='rounded-lg focus:outline-none border-gray-300 text-black pl-7 p-2 text-xl'
        placeholder='Password' />
      
      <button className='bg-white text-black p-3 rounded-lg'
        onClick={()=>onSignUp()} >
        {loading ? "Loading" : "Sign Up"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  )
}

export default Page;
