import React from 'react'
import PaymentPage from '../components/PaymentPage'
import connectDb from '../db/connectDb'
import User from '../models/User'
import { notFound } from 'next/navigation'
import { Tiro_Tamil } from 'next/font/google'

const Username =  async ({ params }) => {
    const checkUser = async()=>
    {
        await connectDb()
        let u = await User.findOne({username: params.username})
        if(!u)
        {
            return notFound()
        }
   
    }
    await checkUser()
    return (
        <>
         <PaymentPage username={params.username} />
        </>
    )
}

export default Username

export async function generateMetadata({params}){
    return{
        title: `Support ${params.username} - Get me a Chai`
    } 
}
