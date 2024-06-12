import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCheckmarkDone } from "react-icons/io5";
import Admin from './Admin';
import { MdMarkEmailRead } from "react-icons/md";

function FileUploadSingle() {
  const history = useNavigate();
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  // const[emailNotVerified , setEmailNotVerified] = useState(false)
  const [isAdmin , setIsAdmin] =useState(false)
  const[isLoadings , setIsLoadings] = useState(false)
  let filename;
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(file)
      
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      console.log("djdskbj");
    }
    

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(file.name)
        filename = `http://localhost:3001/uploads/${file.name}`
        setImageURL(filename);
        console.log(filename)
        console.log(file)
        setIsLoading(false);

        // Navigate to the '/' URL after successful upload
        // history('/', { state: { imageURL: filename, file ,email } });
        history('/quiz', { state: { imageURL: filename, file ,email ,otp } });
        // naviagating to '/' url with two props
        
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };


  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };


  const sendOtp = async () => {
    setIsLoadings(true)
    if (!email) {
      alert("Please provide an email address.");
      setIsLoadings(false)
      return;
      
    }

    try {
      const response = await fetch('http://localhost:9000/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
        
      });

      if (response.ok) {
        setIsOtpSent(true);
        // alert("OTP sent to your email.");
        setIsLoadings(false)
      } else {
        alert("Failed to send OTP. Please try again.");
        setIsLoadings(false)
      }
      console.log(email)
    } catch (error) {
      console.error(error);
      alert("Error sending OTP. Please try again.");
      setIsLoadings(false)
    }
  };

  const validateOtp = async () => {
    if (!otp) {
      alert("Please provide OTP.");
      return;
    }

    try {
      const response = await fetch('http://localhost:9000/validate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      if (response.ok) {
        setIsOtpValid(true);
        alert("OTP validated successfully.");
        console.log(email)
        console.log(typeof(email))
        if(email ==="rojeshchudal000@gmail.com"){
          // history('/quiz', { state: { imageURL: filename, file ,email } });
          setIsAdmin(true)
          // history('/admin')
        }
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error validating OTP. Please try again.");
    }
  };

 const handleAdmin =() =>{
  history('/admin',{state : {otp}});

 }

 const adminAsUser = () =>{
  setIsAdmin(false);
 }



 const handleEmail = (e)=>{
 setEmail(e.target.value)
 console.log(email)
 }



  return (
    <div className='h-screen w-full grid place-content-center bg-white '>
       <form action="" className='h-auto bg-zinc-50 border rounded-2xl shadow-md  space-x-12 flex items-center'>
        <div className='ml-4 p-5'>
            {/* <h1 className='text-red-700 font-bold text-xl '>Step 1:</h1> */}
              <h1 className='text-xl mb-2 font-normal font-serif '>Email:</h1>
            {/* <p className='text-2xl mb-4'> <MdMarkEmailRead/></p> */}
            <input type="email" onChange={handleEmail} placeholder='Enter your Email Address' className='border rounded-lg text-xl border-gray-400 p-1 text-center w-[320px] text-gray-800' disabled={isOtpSent}  required/> <br /> <br /> 
            {/* <input type="submit" value='submit'/> */}
            <button type="button" onClick={sendOtp} disabled={isOtpSent} className='text-xl bg-red-800  rounded-lg text-white hover:bg-green-800 px-4 py-1 spinner font-serif'isLoadings={isLoadings} >Send OTP</button> <br /> <br />
            <span>{isLoadings && <div className="spinner">Sending OTP...</div>}</span> 
            {isOtpSent && (
              <>
                <p className='flex text-slate-400 text-lg font-sans font-bold'><IoCheckmarkDone className='text-xl font-extrabold text-green-700'/>OTP sent to {email}</p>
                <p className='text-lg font-serif mt-2'>OTP:</p>
                <input type="text" value={otp} onChange={handleOtpChange} disabled={isOtpValid} className='border border-gray-400 text-xl p-1 text-center rounded-lg w-[320px] ' placeholder='Enter your OTP here' required /><br />
                <button type="button" onClick={validateOtp} disabled={isOtpValid}  className='text-xl mt-2 bg-green-800 border rounded-lg text-white hover:bg-red-700 px-2 py-1'>Validate OTP</button>
              </>
            )}
        
        
            {isOtpValid && !isAdmin &&
            <div>
              <input type="file" onChange={handleFileChange} className='mt-4' required/>
              <div>{file && `${file.name} - ${file.type}`}</div><br />
              <button type="submit"  onClick={handleUploadClick} disabled={isLoading} className='text-xl bg-red-800 border border-gray-400 py-1 rounded-lg text-white hover:bg-teal-700 px-2'
                >Submit</button>
              {/* <button type="submit"  onClick={sentEmail} onMouseEnter ={handleUploadClick} disabled={isLoading}>Upload</button> */}
              {isLoading && <div className="spinner">Submitting...</div>}
            </div>
          }
          {isAdmin && 
          <div className='border border-green-800'>
             <button onClick={handleAdmin} className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2 m-2'>Proceed to Admin Panel</button>
             <button onClick={adminAsUser} className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2 m-2'>Proceed to User Page</button>
          </div>
          }
      </div>
      <div className='flex items-center py-6 pr-6'>
        <MdMarkEmailRead className='h-[200px] w-[200px] hidden sm:block bg-orange-800 text-white rounded-full p-6'/>
      </div>
      </form>
    </div>
  );
}
export default FileUploadSingle;
