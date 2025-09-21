"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setshowdropdown] = useState(false)

    return (
        <nav className='flex w-130  [@media(min-width:490px)]:w-full justify-between items-center p-3 bg-blue-950 text-white'>
            <div className="logo  flex justify-center items-center">
                <Link href={"/"}><div  className='font-bold text-xl'> EarnByShow!</div></Link>
                
                <div ><span><img src="/tea.gif" width={48} alt="" /></span></div>

            </div>
            <div>
                {/* <ul className='flex gap-3 px-2'>
            <li>Home</li>
            <li>About</li>
            <li>SignUp</li>
            <li>Login</li>
        </ul> */}
            </div>
            <div>
                {session && <>
                    <button onClick={() => setshowdropdown(!showdropdown)} onBlur={() => {
                        setTimeout(() => {
                            setshowdropdown(false)
                        }, 300)
                    }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>


                    <div id="dropdown" className={`z-10 absolute [@media(min-width:400px)]:right-50px -right-[px]  ${showdropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" arialabelledby="dropdownDefaultButton">
                            <li>
                                <Link href="/dasboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard </Link>
                            </li>
                          
                            <li>
                                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your page</Link>
                            </li>
                            <li >
                                <Link onClick={() => signOut()}  href="" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Log out</Link>
                            </li>
                            
                        </ul>
                    </div>
                </>
                }
                {!session && <Link href={"/login"}>
                    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
                </Link>}

            </div>
        </nav>
    )
}

export default Navbar
