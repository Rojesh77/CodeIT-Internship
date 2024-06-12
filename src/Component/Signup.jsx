import React,{useState} from 'react';


function Signup() {
	const[myusername,setMyusername]=useState("")
  const[myemail,setMyemail]=useState("")
  const[mypassword,setMypassword]=useState("")
  const[confirmpassword,setConfirmpassword]=useState("")
  const[signupdata,setSignupdata]=useState([]);
  const handlesignup=(e)=>{
     e.preventDefault();
    console.log("submitted");
    const newsignup={id:new Date().getTime().toString(),myusername,myemail,mypassword,confirmpassword}
    setSignupdata([...signupdata,newsignup]);
    console.log(newsignup);
    setMyusername("");
    setMyemail("");
    setMypassword("");
    setConfirmpassword("");
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="flex flex-col px-6 py-12 lg:px-8 bg-white border-2 border-gray-300 rounded-lg shadow-lg sm:w-full sm:max-w-sm">
          <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight">Signup to your account</h2>
          <form className="mt-8 space-y-6" action="/login" method="POST" onSubmit={handlesignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent  focus:outline-none sm:text-sm sm:leading-6" value={myemail} onChange={(e)=>setMyemail(e.target.value)}/>
            </div>
            <div className="mt-2">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <input id="username" name="username" type="text" autoComplete="username" required className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:outline-none focus:ring-indigo-600 focus:border-transparent sm:text-sm sm:leading-6" value={myusername} onChange={(e)=>setMyusername(e.target.value)}/>
            </div>
            <div className="mt-2">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm sm:leading-6" value={mypassword} onChange={(e)=>setMypassword(e.target.value)}/>
            </div>
			<div className="mt-2">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm sm:leading-6" value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)}/>
            </div>
            <div>
              <button type="submit" className="w-full justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">Signup</button>
            </div>
          </form>
          <div className='mt-2 text-center'>
            <a href="/Login" className="font-semibold text-indigo-600 hover:text-indigo-500"><u>I already have an account</u></a>
          </div>
        </div>
      </div>
	  <div className="container">
		{
			signupdata.map((element)=>{
			return(
				<div key={element.id}>
				<h2>username: {element.myusername}</h2>
				<h2>email: {element.myemail}</h2>
				<h2>password: {element.mypassword}</h2>
				</div>
			)
			})
		}
</div>
    </>
  );
}

export default Signup;
