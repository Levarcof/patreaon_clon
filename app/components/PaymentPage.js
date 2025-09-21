"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser , fetchpayments ,initiate } from '@/action/useraction'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
// import Razorpay from 'razorpay'

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [payments, setPayments] = useState([])
    const [currentUser, setcurrentUser] = useState({})
    const searchParams = useSearchParams()
// useSearchParams ek function hota hai jo ek array return karta hai jese const [searchParams, setSearchParams] = useSearchParams();
// jisme pehla element searchParams jo hai vo URLSearchParams ka ek object hota hai jo query string ke parameters ko handle karne ke liye kaam  aata hai

    const router = useRouter()
    useEffect(() => {
        if(searchParams.get("paymentdone"=="true")){
            toast('Thanks for your donation!', {
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
        router.push(`/${username}`)
     
    }, []);
    
    useEffect(() => {
        
       getData()
    }, []);


    const handlechange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async ()=>
    {
        let u = await fetchuser(username)
        setcurrentUser(u)

        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options)
        rzp1.open()
    }

    const join = ()=>
    {
        toast('Your joining request is send', {
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className=' relative'>
                {/* {params.username} */}
                <img className='object-cover w-full' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-time=1746316800&token-hash=DC3j8yHxxh70Nj54-Sa6MZNOr-y31CcaxchdcyqQ8Zg%3D" alt="" />
                <div className='absolute top-[90%]  right-[48%]'>
                    <img className=' rounded-full border border-white' width={70} height={70} src={currentUser.profile} alt="" />
                </div>
            </div>

            <div className='flex flex-col  gap-2 justify-center items-center mt-20'>
                <div className='text-3xl font-bold' >
                   Artist - @ {username} 
                </div>
                <div>
                    <p className='text-slate-400'>Creating Animated art for VTT's</p>

                </div>
                <div>
                    <p className='text-slate-400'>{`${payments.length} payment . ₹${payments.reduce((a, b) => a + b.amount, 0)} raised `}</p>
                </div>
                <div>
                    <button onClick={join} type="button" className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                        Join for free
                    </button>
                </div>
                <div className='payment mt-11 flex w-[80%] gap-3 mb-32 '>
                    <div className="supports w-1/2 flex flex-col rounded-lg p-5 bg-slate-900">
                        <h2 className='text-3xl  my-5 font-bold '>Supports</h2>
                        <ul >
                            {payments.length==0 && <li>No payment yet</li> }
                            {payments.map((p ,i)=> {
                                <li className='flex my-4 text-lg gap-2 items-center'>
                                <img width={33} src="avatar.gif" alt="" />
                                <span>{p.name}<b>₹{p.amount}</b> with Message "{p.message}" </span>
                            </li>  
                            })}
        
                        </ul>

                    </div>
                    <div className="makePayment flex flex-col gap-2 w-1/2 rounded-lg p-5 bg-slate-900">
                        <h2 className='text-3xl  my-5 font-bold '>Make a Payment</h2>
                        <div className=' flex flex-col gap-3'>
                            <input onChange={handlechange} name='name' value={paymentform.name || ""} type="text" className=' w-[100%]  bg-slate-800 border-1 p-2 rounded-xl border-white' placeholder='Enter Name ' />
                            <input onChange={handlechange} name='message' value={paymentform.message || ""} type="text" className=' w-[100%]  bg-slate-800 border-1 p-2 rounded-xl border-white' placeholder='Enter Message ' />
                            <input onChange={handlechange} name='amount' value={paymentform.amount || ""} type="text" className=' w-[100%]  bg-slate-800 border-1 p-2 rounded-xl border-white' placeholder='Enter Amount ' />
                            <button disabled={paymentform.name?.length<3 || paymentform.message?.length <4  || paymentform.amount<1} onClick={()=> pay(Number.parseInt(paymentform.amount)*100)} type="button" className="text-white disabled:bg-slate-600 disabled:from-purple-100 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  rounded-lg text-lg font-bold px-5 py-2 text-center me-2 mb-2">Pay</button>
                {/* pay me jo amount jayegi vo paise me jayegi usko rupees me bhejne ke liye 100 se multiply kar denge */}
                        </div>
                        <div className='flex gap-3'>
                            <button onClick={() => pay(1000)} className='bg-slate-700 hover:bg-slate-500 hover:cursor-pointer p-1 rounded-lg text-bold w-[10%]'>₹10</button>
                            <button onClick={() => pay(2000)} className='bg-slate-700 hover:bg-slate-500 hover:cursor-pointer p-1 rounded-lg text-bold w-[10%]'>₹20</button>
                            <button onClick={() => pay(5000)} className='bg-slate-700 hover:bg-slate-500 hover:cursor-pointer p-1 rounded-lg text-bold w-[10%]'>₹50</button>
                            <button onClick={() => pay(10000)} className='bg-slate-700 hover:bg-slate-500 hover:cursor-pointer p-1 rounded-lg text-bold w-[10%]'>₹100</button>

                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default PaymentPage