"use client"
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState  , useEffect } from 'react'
import { updateProfile ,fetchuser } from '@/action/useraction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
    const [form, setform] = useState({razorpaysecret:"", razorpayid:"", coverpic:"",  profile:"", username:"" ,name:"", email:"" })
    const { data: session } = useSession()

    useEffect(() => {
   
      if (!session) {
        router.push('/login')
    }
    else {
        getData()
    }
    }, []);

    const getData = async()=>
      
    {
      let u = await fetchuser(session.user.name)
      setform(u)
    }
    const handlechange = (e)=>
    {
        setform({...form ,  [e.target.name]:e.target.value })
    }
    const handleSubmit = async  (e)=>
    {
      let a = await updateProfile(e,session.user.name)
           toast('Profile Updated', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                      });

    }
    
  return (
    <>  
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
        {/* Same as */}
        <ToastContainer />
    <div className='w-[100vw] gap-3 min-h-[30vh] mx-auto container flex flex-col justify-center items-center'>
    <h2 className='text-3xl text-center [@media(min-width:400px)]:ml-17  w-[100vw] my-5 font-bold '>Welcome to your Dashboard</h2>
      <div className=' w-[100%]  '>
        <form action={handleSubmit} className='flex justify-center ml-10 items-center flex-col w-[100%]'>     
       <input  type="text" onChange={handlechange} name='name' value={form.name || ""} className=' my-3 w-[80%]  bg-slate-800 border-1 p-2 rounded-xl border-white' placeholder='Enter Name ' />
      <input  type="text" onChange={handlechange} name='username' value={form.username || ""} className=' my-3 w-[80%]  bg-slate-800 border-1 p-2 rounded-xl border-white' placeholder='Enter Username ' />
      <input  type="text" onChange={handlechange} name='email' value={form.email || ""} className=' my-3 w-[80%]  bg-slate-800 border-1 p-2 rounded-xl border-white' placeholder='Enter Email ' />
      <input  type="text" onChange={handlechange} name='profile' value={form.profile || ""} className=' my-3 w-[80%]  bg-slate-800 border-1 p-2 rounded-xl border-white' placeholder='Profile Picture' />
      <input  type="text" onChange={handlechange} name='coverpic' value={form.coverpic || ""} className=' my-3 w-[80%]  bg-slate-800 border-1 p-2 rounded-xl border-white' placeholder='Cover Picture' />
      <input  type="text" onChange={handlechange} name='razorpayid' value={form.razorpayid || ""} className=' my-3 w-[80%]  bg-slate-800 border-1 p-2 rounded-xl border-white' placeholder='Enter Razer ID ' />
      <input  type="text" onChange={handlechange} name='razorpaysecret' value={form.razorpaysecret || ""} className=' my-3 w-[80%]  bg-slate-800 border-1 p-2 rounded-xl border-white' placeholder='Enter Razer Secret ' />
      <button   type="submit" className="text-white bg-gradient-to-br my-2 w-[80%] from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-xl text-lg font-bold px-5 py-2 text-center me-2 mb-2">Submit</button>
     

      </form>
        


      </div>
       
      
    </div>
  </>
  )
}

export default Dashboard

