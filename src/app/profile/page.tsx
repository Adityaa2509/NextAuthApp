'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
function page() {
    const router = useRouter();
    interface User {
        email: string;
        username:string;
        isVerified:boolean;
    }
    const [user, setUser] = useState<User | null>(null);

    const logout = async()=>{
        try{
            const resp = await axios.post('/api/users/logout');
        
            if(resp.data.status === 200)
                router.push('/login');
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        const extract = async()=>{
            try{
                const resp = await axios.get('/api/users/me');
                console.log(resp.data);
                setUser({
                    email: resp.data.data.email,
                    username: resp.data.data.username,
                    isVerified: resp.data.data.isVerified
                })
            }catch(err){

            }
        }
        extract()
    },[])
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
        <h1 className='text-4xl text-center font-extrabold mt-10'>Profile Page</h1>
        {
            !user?<>
            Nothing Found Please Login 
        <Link href='/login' className='underline'>Login Please</Link>
        {user}
            </>:<div className='flex flex-col justify-center items-center gap-7'>
            <div className='text-3xl font-extrabold text-orange-500'>{user.username}</div>
            <div className='text-2xl font-semibold text-green-500'>{user.email}</div>
            <div className='text-2xl font-semibold text-red-800 bg-orange-400 px-4 py-5
            '>
            {user.isVerified?"Aap Verfied Hai Sir Enjoy!!":"Chup Email jaake bhai mere too verified ho le varna pitega"}
            </div>
            
            </div>
        }
        {user?
            <button className='bg-red-800 px-7 py-3 text-black font-semibold text-xl cursor-pointer rounded-2xl mt-10'
      onClick={logout}
      >Logout</button>:<></>
}
    </div>
  )
}

export default page