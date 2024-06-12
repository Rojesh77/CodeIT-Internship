import React from 'react';
// import './About.css';

export default function About() {
  return (
    <>
      <div className='h-screen w-full'>
        <nav className="bg-slate-50 shadow-sm w-full h-[70px] flex justify-between items-center px-4 text-slate-800">
          <div className="md:ml-2">
            <a href="/about"><img className="h-12 w-18" src="./bb.jpg" alt="" /></a>
          </div>
          <div>
            <ul className="md:flex space-x-14 hidden text-xl cursor-pointer">
              <li>
                <a className="hover:text-red-700 font-semibold" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-red-700 font-bold" href="/about">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-red-700 font-semibold" href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-green-900 hidden md:block hover:bg-sky-600 p-2 text-white rounded-md">
            <a href="//fileuploadpage">Login/Signup</a>
          </div>
          <div className="md:hidden">
            <a className="text-5xl" href="/login">
              &#8801;
            </a>
          </div>
        </nav>
        <div className='relative'>
          <img className='h-[500px] w-full object-cover' src="./students.jpg" alt="" />
          <div className='absolute top-0 left-0 h-full w-full bg-black opacity-80'></div>
          <div className='absolute bottom-20 left-10 md:top-36 md:left-20 text-slate-300'>
            <h1 className='text-2xl font-bold'>About Us</h1>
            <p className='text-xl  mt-3'>
              At Code IT, we understand that financial barriers should never hinder your educational journey.
            </p>
          </div>
        </div>
        <div className='md:ml-20 md:mt-10 md:mr-20'>
          <h1 className='font-bold text-2xl text-zinc-900'>Why Choose Code IT?</h1>
          <p className=' text-zinc-800'>
            At Code IT, we take pride in being a premier computer institute committed to shaping the future of tech enthusiasts since our establishment on December 24, 2017. As a dedicated center for learning and development, we empower individuals with the skills and knowledge essential for success in the dynamic world of technology.
          </p>

          <h1 className='font-bold mt-4 text-xl text-zinc-900'>Our Mission:</h1>
          <p className='text-zinc-800'>
            At the core of Code IT's philosophy is the mission to provide comprehensive and cutting-edge training in software development, mobile app development, and various other technological domains. We strive to bridge the gap between theoretical understanding and practical application, enabling our students to excel in the rapidly evolving tech landscape.
          </p>

          <h1 className='font-bold mt-2 text-xl text-zinc-900'>What Sets Us Apart:</h1>
          <h1 className='font-bold mt-4 text-zinc-900'>1. Expert Instructors:</h1>
          <p className='text-zinc-800'>
            Our team of experienced and industry-recognized instructors are passionate about technology and committed to nurturing the next generation of tech professionals. They bring real-world expertise to the classroom, ensuring that our students receive top-notch education.
          </p>

          <h1 className='font-bold text-zinc-900 mt-2'>2. Comprehensive Curriculum:</h1>
          <p className='text-zinc-800'>
            The Code IT curriculum is meticulously crafted to cover a wide array of topics in software and mobile app development. We stay updated with industry trends, integrating the latest tools and technologies into our courses to provide students with a competitive edge.
          </p>

          <h1 className='font-bold text-zinc-900 mt-2'>3. Flexible Learning Options:</h1>
          <p className='text-zinc-800'>
            Recognizing the diverse needs of our students, we offer both online and physical classes. Whether you prefer the flexibility of learning from the comfort of your home or the interactive experience of in-person classes, Code IT has a solution tailored for you.
          </p>

          <h1 className='font-bold text-zinc-900 mt-2'>4. Hands-On Projects:</h1>
          <p className='text-zinc-800'>
            Practical application is crucial in the tech world. At Code IT, we emphasize hands-on projects, allowing students to apply their knowledge in real-world scenarios. This approach not only enhances their problem-solving skills but also builds a robust portfolio for future endeavors.
          </p>

          <h1 className='font-bold text-zinc-900 mt-2'>5. Career Guidance:</h1>
          <p className='text-zinc-800'>
            Beyond just education, Code IT is committed to fostering successful careers. Our career guidance services assist students in navigating the job market, preparing for interviews, and connecting with industry professionals, ensuring a smooth transition from learning to employment.
          </p>

          <h1 className='font-bold text-zinc-900 mt-2'>6. Community Engagement:</h1>
          <p className='text-zinc-800'>
            Code IT is more than just a learning institution; it's a community of like-minded individuals passionate about technology. Engage with fellow students, alumni, and industry experts through our events, workshops, and networking opportunities.
          </p>

          <p className='text-zinc-800'>
            Embark on a transformative journey with Code IT, where innovation meets education, and aspirations turn into achievements. Join us, and let's code a brighter future together!
          </p>
        </div>
        <footer className="p-2 md:px-8 text-black bg-indigo-50 flex flex-col pb-12 w-full h-auto pt-8 md:flex-row flex-wrap md:justify-between md:mt-16 relative">
          <div className="flex flex-col text-zinc-950 font-extralight mb-8">
            <div className='mb-2'>
              <img className="h-18 w-28" src="./bb.jpg" alt="" />
              <a href="https://codeit.com.np/">
                <p className="font-medium text-slate-700 text-lg mt-1">info@codeit.com.np</p>
              </a>
            </div>
            <p>9862130505, 025-575163</p>
            <p>Prithvi Path, Dharan</p>
          </div>
          <div className="flex flex-col md:items-center">
            <h2 className="text-2xl font-bold font-serif">Quick Links</h2>
            <div className="border-b-2 w-24 h-1 border-yellow-800"></div>
            <div className="mt-3 text-black flex flex-col md:items-center flex-wrap font-normal">
              <p>
                <a href="/" className="hover:text-gray-700">Home</a>
              </p>
              <p>
                <a href="/about" className="hover:text-gray-700">About Us</a>
              </p>
              <p>
                <a href="/contact" className="hover:text-gray-700">Contact Us</a>
              </p>
            </div>
          </div>
          <div className="flex flex-col md:items-center">
            <h2 className="text-2xl font-bold font-serif">Account Details:</h2>
            <div className="border-b-2 w-32 h-1 border-yellow-800"></div>
            <div className="mt-3 flex flex-col md:items-center flex-wrap text-black font-normal">
              <p>Bank: Nepal Bank Limited</p>
              <p>Account Name: CODE IT</p>
              <p>Ac/No.: 01600106885462000001</p>
              <p>Branch: Dharan</p>
            </div>
          </div>
          <div className="flex flex-col md:items-center">
            <h2 className="text-2xl font-bold font-serif">Download App</h2>
            <div className="border-b-2 w-32 h-1 border-yellow-800"></div>
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
      </div>
 </>
 );
}
