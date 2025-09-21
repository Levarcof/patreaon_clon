"use client"
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { redirect } from "next/navigation";
import Dashboard from '../components/Dashboard';

const page = () => {
    const { data: session } = useSession(); // Always call hooks at the top level
    
    if(!session){
        redirect("/login");
    }
  return (
    <>
   <Dashboard/>
  </>
 
  )
}

export default page
