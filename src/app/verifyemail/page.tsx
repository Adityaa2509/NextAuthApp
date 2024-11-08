'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';

function page() {
    const router = useRouter();
  const[token,setToken] = useState("");
  const [verified,setVerified] = useState(false);
  const [error,setError] = useState(false)
    const verifyEmail = async()=>{
        try{
           const resp =  await axios.post('/api/users/verifyEmail',{token});
            console.log(resp.data);
            if(resp.data.status === 200)
                router.push('/profile')
        }catch(err){
            console.log(err)

        }
    }
    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

     
    },[])
    useEffect(()=>{
        if(token.length>0)
            verifyEmail()
    },[])
    return (
    <div
    className='flex flex-col justify-center items-center text-center mt-28'>
        <button className='bg-green-400 px-7 py-3 text-black font-semibold text-xl cursor-pointer rounded-2xl mt-10' onClick={verifyEmail}>
            Verify Kar Le
        </button>
   
    </div>
  )
}

export default page