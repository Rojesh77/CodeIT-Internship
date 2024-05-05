import React,{useState} from 'react';

export default function Login() {
	const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[cv,setCv]=useState(null)
  const[logindata,setLogindata]=useState([])
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCv(file);
  };

  const handlelogin=(e)=>{
    e.preventDefault();
    const newlogin={id:new Date().getTime().toString(),email,password,cv};
    // const property = Object.keys(newlogin)
    // console.log(property);
    setLogindata([...logindata,newlogin]);
    setEmail("");
    setPassword("");
    setCv(null);
    console.log(logindata);
    if (cv) {
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log("File content:", e.target.result);
      };
      reader.readAsText(cv);
    }
  }
  return (
	<>
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="flex flex-col px-6 py-12 lg:px-8 bg-white border-2 border-gray-300 rounded-lg shadow-lg sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="/home" method="POST" onSubmit={handlelogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:outline-none focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
            </div>
            <div>
              <div className="flex items-center mt-2 justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" type="password" autoComplete="off" required className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 focus:outline-none shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
            </div>
			<div>
              <label htmlFor="cv" className="block text-sm font-medium leading-6 text-gray-900">Upload your CV</label>
              <div className="mt-2">
                <input id="cv" name="cv" type="file" autoComplete="off" required className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:outline-none focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleFileChange}/>
              </div>
            </div>
            <div className='pt-0'>
              <button type="submit" className="w-full justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">Login</button>
            </div>
          </form>
          <div className='mt-2'>
            <a href="/Signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"><u>Create an account</u></a>
          </div>
        </div>
      </div>
    </div>
	<div className="container">
  {
    logindata.map((element)=>{
      return(
        <div key={element.id}>
          <h2>username: {element.username}</h2>
          <h2>password: {element.password}</h2>
          <h2>file: {element.cv ? element.cv.name : "No file uploaded"}</h2>
        </div>
      )
    })
  }
</div>
	</>
  );
}
