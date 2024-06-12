import React, { useState, useEffect } from 'react';
import { IoCheckmarkDone } from "react-icons/io5";

const Completed = ({ imageURL, file, downloadFile, email }) => {
  const [fileContent, setFileContent] = useState(null);
  const[isLoadings , setIsLoadings] = useState(false)
  
  
  useEffect(() => {
    const fetchDataAndSendEmail = async () => {
      setIsLoadings(true)
      try {
        if (imageURL) {
          // Fetch the image content from the imageURL
          const response = await fetch(imageURL);
          if (!response.ok) {
            setIsLoadings(false)
            throw new Error('Network response was not ok');
            
          }
          const blob = await response.blob();
          setFileContent(blob);

          // Send email after fetching the file content
          sendEmail(blob);
        }
      } catch (error) {
        setIsLoadings(false)
        console.error('Error fetching file:', error);
      }
    };
    fetchDataAndSendEmail(); // Call the async function immediately
  }, []);

  // const handleDownloadClick = () => {
  //   if (fileContent) {
  //     const link = document.createElement('a');
  //     link.href = URL.createObjectURL(fileContent);
  //     link.target = '_blank';
  //     link.download = file.name;
  //     link.click();
  //   }
  // };

  const baseURL = "http://localhost:8000";
  const sendEmail = async (blob) => {
    
    if (blob) {
      const formData = new FormData();
      formData.append('file', blob, file.name);
      formData.append('email', email);

      try {
        const res = await fetch(`${baseURL}/sendEmail`, {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          // alert("Sent Successfully!");
          setIsLoadings(false)
        } else {
          console.error('Error:', res.statusText);
          setIsLoadings(false)
          alert("Error sending email");
        }
      } catch (error) {
        console.error('Error:', error);
        setIsLoadings(false)
        alert("Error sending email");
      }
    } else {
      setIsLoadings(false)
      alert("No file content to send");
    }
  };

  return (
    
    <div>
      <div>
        <h1 className='text-xl font-semibold text-white'>Download your answer and review your code</h1>
      </div>
      <div className='mt-4'>
        <button
          className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2'
          onClick={downloadFile}
        >
          Click Here
        </button>
        {/* <button
          className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2'
          onClick={handleDownloadClick}
        >
          Download CV
        </button> */}
        {/* <h1 className='text-red-100'>Your CV has been received by HR of codeIT. Stay tuned! You will get a call for an interview.</h1> */}
        {isLoadings && <div className="spinner">Don't exit , Sending Mail to HR...</div> }
        {!isLoadings && <div className="spinner flex"> <h1 className='flex text-slate-400 text-xl m-2'><IoCheckmarkDone className='text-xl font-extrabold text-green-700 m-1'/>Your details has been received by HR of codeIT. Stay tuned! You will get a call for an interview</h1></div>}
      </div>
    </div>
  );
};

export default Completed;
