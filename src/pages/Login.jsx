import React from 'react'
// import shea from '../assets/shea.png';
import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo from "../assets/logo11.png";

const Login = () => {
  return (
    <>
    <Navbar />
    <div className='min-h-screen bg-[#F5FBF2] flex '>
        <div className=' mx-auto my-auto h-[55vh] w-[40%] bg-white items-center flex flex-col rounded-lg shadow-lg'>
            <div>
            <img src={logo} alt="" className='w-25' />
            </div>
     
      <div className='flex flex-col '>
        <h1 className='text-2xl font-bold text-black'>Sign In</h1>
        <h2 className='mt-5'>Enter your email and we'll send you a verification code</h2>
      </div>
       </div>
    </div>
    <Footer/>
    </>
  )
}

export default Login
