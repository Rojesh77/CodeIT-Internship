import React, { useState, useEffect } from 'react';
import { IoCheckmarkDone } from "react-icons/io5";

const NotCompleted = ({downloadFile}) => {
  
  
  

  // const handleDownloadClick = () => {
  //   if (fileContent) {
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(fileContent);
  //     link.target = '_blank';
  //     link.download = file.name;
  //     link.click();
  //   }
  // };

  
  return (
    <div className='h-screen grid place-content-center'>
      <div className='border  p-6 rounded-2xl shadow-sm shadow-gray-700'>
      <div>
        <h1 className='text-xl font-semibold text-white'>Download your answer and review your code.</h1>
      </div>
      <div className='mt-4'>
        <button
          className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2 py-1'
          onClick={downloadFile}
        >
          Download
        </button>
        {/* <button
          className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2'
          onClick={handleDownloadClick}
        >
          Download CV
        </button> */}
        {/* <h1 className='text-red-100'>Your CV has been received by HR of codeIT. Stay tuned! You will get a call for an interview.</h1> */}
        <div ><h1 className='text-xl font-semibold text-slate-400 m-2'><u className='text-green-700' >Sorry! You didn't get qualified in exam due to poor score. <br />Better luck next time </u> </h1></div> 
        </div>
      </div>
    </div>
  );
};

export default NotCompleted;
