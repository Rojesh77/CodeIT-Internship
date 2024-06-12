import React from 'react'
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa";

export default function Contact() {
  return (
    <>
	<div className='h-screen'>
	  <nav className="bg-slate-50 shadow-sm w-full h-[70px] flex justify-between items-center px-4 text-gray-800">
          <div className="md:ml-6">
            <img className="h-12 w-18" src="./bb.jpg" alt="" />
          </div>
          <div>
            <ul className="md:flex space-x-14  hidden text-xl cursor-pointer">
              <li>
                <a className=" hover:text-red-700 font-semibold" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className=" hover:text-red-700 font-semibold" href="/about">
                  About Us
                </a>
              </li>
              <li>
                <a className=" hover:text-red-700  font-bold" href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-green-900 hidden md:block hover:bg-black p-2 text-white rounded-md">
            <a href="/fileuploadpage">Login/Signup</a>
          </div>
          <div className="md:hidden">
            <a className="text-5xl" href="/login">
              &#8801;
            </a>
          </div>
        </nav>
		  <div className='h-[100vh] md:mt-12 md:ml-20'>
			<div>
				<h1 className='text-3xl font-bold text-zinc-900 mb-3'>Contact Us</h1>
				<h2 className='text-neutral-900 text-md'>If you have any queries, please do not hesitate to contact us.</h2>
				<span className='text-slate-700 text-lg'>Email:</span><a href="https://codeit.com.np/" className='text-slate-500 text-lg'>info@codeit.com.np</a>
			</div>
      <div className='flex space-x-32'>
			<div className=' h-[380px] w-[45%] border-2  shadow-md rounded-2xl shadow-gray-300 mt-10 '>
				<h1 className='ml-8 mt-4 font-semibold text-2xl text-zinc-900'>Contact Us</h1>
				<div className=' mt-3 ml-4 h-[1px] bg-slate-300 w-[190px]'></div>
				<div className=' mt-4 h-[1px] bg-gray-300'></div>
				<div className='h-80'>
          <div className='flex items-center  mt-6 ml-4  space-x-6'>
					<div className=' h-[30px] rounded-lg w-[30px] bg-orange-800 ml-2 grid place-content-center'>
				  <BsFillTelephoneFill className='text-white'/>
					</div>
          <div>
            <h1 className='text-lg font-medium'>Call Us</h1>
            <p className="text-slate-700">9862130505 , 025-575163</p>
            </div>
          </div>
          <div className='flex items-center  mt-3 ml-4  space-x-6 '>

					<div className=' h-[30px] rounded-lg w-[30px] bg-orange-800 ml-2 grid place-content-center'>
				  <HiOutlineMail className='text-white'/>
					</div>
          <div>
            <h1 className='text-lg font-semibold'>Email:</h1>
           <a href="https://codeit.com.np/"> <p className='text-slate-700'>info@codeit.com.np</p></a>
            </div>
          </div>
          <div className='flex items-center  mt-3 ml-4  space-x-6 '>

					<div className=' h-[30px] rounded-lg w-[30px] bg-orange-800 ml-2 grid place-content-center'>
				  <FaLocationDot className='text-white'/>
					</div>
          <div>
            <h1 className='text-lg font-semibold'>Address:</h1>
            <p className='text-slate-700'>Prithvi Path,Dharan</p>
            </div>
          </div>
          <div className='flex items-center  mt-3 ml-4  space-x-6 '>

					<div className=' h-[30px] rounded-lg w-[30px] bg-orange-800 ml-2 grid place-content-center'>
				  <FaBusinessTime  className='text-white'/>
					</div>
          <div>
            <h1 className='text-lg font-semibold'>Working Hours:</h1>
            <p className='text-slate-700 '>Working Hours:</p>
            </div>
          </div>
				</div>
			</div>
      <div className='w-[45%]  h-auto'>

      <iframe className='w-[100%] h-[450px] border-none' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28485.296991022653!2d87.286299!3d26.818885!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef4175e4f26a95%3A0x9b8526c7c4c7bc1c!2sCode%20IT!5e0!3m2!1sen!2snp!4v1716966433040!5m2!1sen!2snp"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      </div>
		 </div>
	</div>
  <footer className="p-2 md:px-8 text-black bg-indigo-50 flex flex-col pb-12  w-full h-auto pt-8 md:flex-row flex-wrap md:justify-between md:mt-12 relative">
          {/* <div className="absolute top-0 left-0 w-[100%] overflow-hidden">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill relative block "></path>
    </svg>
          </div> */}
          <div className="flex flex-col text-zinc-950  mb-8">
            <div className='mb-2'>
            <img className="h-18 w-28" src="./bb.jpg" alt="" />
            <a href="https://codeit.com.np/"><p className="font-medium text-slate-700 text-lg mt-1">info@codeit.com.np</p></a>
            </div>
            <p>9862130505 , 025-575163</p>
            <p>Prithvi Path,Dharan</p>
          </div>
          <div className="flex flex-col md:items-center">
            <h2 className="text-2xl font-bold font-serif">Quick Links</h2>
            <div className="border-b-2 w-28 h-1 border-yellow-800"></div>
            <div className="mt-3 text-black flex flex-col md:items-center flex-wrap font-normal">
              <p>
                <a href="/" className="hover:text-gray-400">Home</a>
              </p>
              <p>
                <a href="/about" className="hover:text-gray-400">About Us</a>
              </p>
              <p>
                <a href="/contact" className="hover:text-gray-400">Contact Us</a>
              </p>
            </div>
          </div>
          <div className="flex flex-col md:items-center">
            <h2 className="text-2xl font-bold font-serif">Account Details:</h2>
            <div className="border-b-2 w-36 h-1 border-yellow-800"></div>
            <div className="mt-3 flex flex-col md:items-center flex-wrap text-black font-normal">
              <p>Bank: Nepal Bank Limited</p>
              <p>Account Name: CODE IT</p>
              <p>Ac/No: 01600106885462000001</p>
              <p>Branch: Dharan</p>
            </div>
          </div>
          <div className="flex flex-col md:items-center">
            <h2 className="text-2xl font-bold font-serif">Download App</h2>
            <div className="border-b-2 w-36 h-1 border-yellow-800"></div>
            <div className="mt-3 flex flex-col md:items-center flex-wrap text-black font-normal">
              <p>Download our mobile app.</p>
              <p>New version coming soon...</p>
            </div>
          </div>
        </footer>
        <div className="bg-indigo-100 text-black">
          <h2 className="text-center font-bold text-md pb-4 pt-4">
            &copy; CodeIt. All Rights Reserved
          </h2>
        </div>
</>
  )
}