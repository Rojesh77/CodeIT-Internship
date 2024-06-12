import React, { useState } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import FileUploadSingle from './FileUploadPage';

const Admin = () => {
  const [language, setLanguage] = useState(localStorage.getItem('selectedLanguage') || ''); // Retrieve language from localStorage
  const navigate = useNavigate();
  const loc = useLocation()
  const {otp} = loc.state || {};
  console.log(otp)
  const[userOTP , setUserOTP] = useState();
  const [isAdmin,setIsAdmin] = useState(false)
  const [isnotAdmin , setIsNotAdmin] = useState(false)

  const handleLanguage = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage); // Store selected language in localStorage
  };
  if(!otp){
    alert("Please Login yourself as a admin first")
    // window.location.href('/')
    return(
      <div className='m-3'>
        <h1  className='text-xl font-semibold text-black'>Return to Login page and validate yourself as a admin first</h1>
        <button className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2 mt-3' onClick={()=>{navigate('/fileuploadpage')}}>Return to login page</button>
      </div>
    )
  }
  const handleButton = () => {
    navigate('/fileuploadpage');
  };

  const handleTime = (e) =>{
    const time = e.target.value
    console.log(time);
  }
  const handleOTP = (e) => {
    setUserOTP(e.target.value)
  }

  const validateOTP = () =>{
    if(otp === userOTP){
      setIsAdmin(true)
    }
    else{
      setIsAdmin(false)
    }
  }

  return (
    <div className='m-2'>
     {!isAdmin && 
     <div>
       <p>Please Enter your previous OTP again</p>
       <input type="text" onChange={handleOTP} className='border border-green-800 text-center w-[350px]'/>
       <button onClick={validateOTP}  className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2 mt-3'>Validate OTP</button>
     </div>
     }
      {isAdmin &&
      <div>
      <div>
      <p>Hi admin, Welcome here</p>
      </div>
      <div>
      <h1 className='mb-1 text-green-600 font-bold'>1. SELECT THE LANGUAGE FOR WEBSITE</h1>
      <select name="" id="MyLanguage" className='bg-slate-100 text-black font-semibold text-xl rounded-lg p-2' onChange={handleLanguage} value={language} style={{ border: '1px solid grey' }}>
        <option value="php">PHP</option>
        <option value="javascript">React</option>
        <option value="python">Python</option>
        <option value="dart">Dart</option>
        <option value="typescript">Typescript</option>
      </select>
    </div>

    <div>
      <button className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2 mt-3' onClick={handleButton}>Return Login</button>
    </div>
    </div>
      }
      {isnotAdmin && 
      <div>
        Login yourself as a admin first
      </div>

      }
    </div>
  );
}

export default Admin;
