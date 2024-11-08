'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
function page() {
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const [diabled,setDisabled] = useState(false)
  const [user,setUser] = useState({
    email:"",
    password:""
  })
  const signup = async()=>{
    try{
      console.log(user);
      setLoading(true)
      setDisabled(true)
      const resp = await axios.post('/api/users/login',user)
      console.log(resp.data);
      if(resp.data.status === 402)
        router.push('/signup')
      else router.push('/profile')
      setLoading(false)
      setDisabled(false)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    setDisabled(!(user.email && user.password))
  },[user])
  return (
    <div className='flex flex-col justify-center items-center text-center gap-5'>
      <div className='text-center text-4xl font-extrabold mt-10 mb-10'>
        {loading?"Processing":"Login Please Babu"}</div>
      <label htmlFor="email">email</label>
      <input type="email" name="email" id="email" placeholder='enter email' className='
      rounded-xl border-none focus:outline-none text-black px-6 py-4 -mt-5' 
      onChange={(e)=>setUser({...user,email:e.target.value})}
      value={user.email} />
      <label htmlFor="password">password</label>
      <input type="password" name="password" id="password" placeholder='enter password' className='
      rounded-xl border-none focus:outline-none text-black pl-6 py-4 -mt-5'
     
      value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})}/>
      <button className='bg-white px-7 py-3 text-black font-semibold text-xl cursor-pointer rounded-2xl mt-10'
      disabled={diabled}
      onClick={signup}
      >{!loading?"Login":"Loading"}</button>
    </div>
  )
}

export default page