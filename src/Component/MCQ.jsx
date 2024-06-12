import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { data } from '../assets/data';
import { python } from '../assets/python';
import { php } from '../assets/Php';
import { dart } from '../assets/Dart';
import { typescript } from '../assets/Typescript';
import { useNavigate, useLocation } from 'react-router-dom';
import Clock from './Clock';

export default function Quiz() {
  const location = useLocation();
  const { imageURL, file, email ,otp  } = location.state || {};
  console.log(otp)
  const[myOtp ,setMyOtp] = useState(false)
  
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [id, setId] = useState("");
  const [clock, setClock] = useState(undefined); // State variable for clock
  const [isComplete, setIsComplete] = useState(false);

  
  
  
  const navigate = useNavigate();

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let option_array = [option1, option2, option3, option4];



  // Function to shuffle the questions
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // setId(language);
  // useEffect(() =>{
  //   setId(language);
  // },[language])

  useEffect(() => {
    // Set language id from localStorage when component mounts
    setId(localStorage.getItem('selectedLanguage') || 'php');
  }, []);

  useEffect(() =>{
    if(otp){
      setMyOtp(true);
    }
   
  },[])

  useEffect(() => {
    let selectedQuestions;
    if (id === 'javascript') {
      selectedQuestions = shuffleArray([...data]).slice(0, 5);
    } else if (id === 'python') {
      selectedQuestions = shuffleArray([...python]).slice(0, 5);
    } else if (id === 'php') {
      selectedQuestions = shuffleArray([...php]).slice(0, 5);
    } else if (id === 'typescript') {
      selectedQuestions = shuffleArray([...typescript]).slice(0, 5);
    } else if (id === 'dart') {
      selectedQuestions = shuffleArray([...dart]).slice(0, 5);
    }

    // Check if selectedQuestions is defined before setting state
    if (selectedQuestions && selectedQuestions.length > 0) {
      setQuestions(selectedQuestions);
      setQuestion(selectedQuestions[0]);
    }
  }, [id]); // Make sure to add id as a dependency to useEffect

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        setLock(true);
        option_array[question.ans - 1].current.classList.add('correct');
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === questions.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index + 1]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
        return null;
      });
    }
  };

  const handleclick = () => {
    navigate('/home', { state: { otp , imageURL, file, email, clock , score } });
    console.log(imageURL);
    console.log(file);
    console.log(email);
    console.log(clock);
  };

  

  const handleLanguageChange = (e) => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setId(e.target.value);
    const selectedQuestions = shuffleArray([...data]).slice(0, 5);
    setQuestions(selectedQuestions);
    setQuestion(selectedQuestions[0]);
  };

  const handleTime = (clocktime) => {
    setClock(clocktime);
    // console.log(clocktime);

    if (clocktime === 0) {
      alert("Oops! You ran out of time");
      setIsComplete(true);
    }
  };

  useEffect(() => {
    if (isComplete) {
      // navigate('/completed', { state: { imageURL, file, email } });
      navigate('/home', { state: {imageURL, file, email, clock,score, isCompletes : true } });
    }
  }, [isComplete, navigate, imageURL, file, email]);

  // if(!otp){
  //   alert("Please Login yourself first")
  //   // window.location.href('/')
  //   return(
  //     <div className='m-3'>
  //       <h1  className='text-xl font-semibold text-black'>Register Yourself to continue :</h1>
  //       <button className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2 mt-3' onClick={()=>{navigate('/fileuploadpage')}}>Return to login page</button>
  //     </div>
  //   )
  // }

  return (
    <>
    {!myOtp && 
    <div className='m-3'>
      <h1  className='text-xl font-semibold text-black'>Login Yourself first</h1>
      <button className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2 mt-3' onClick={()=>{navigate('/fileuploadpage')}}>Return to login page</button>
    </div>
    }
    {myOtp &&
    <div>
      <div className='w-[200px] mt-10 ml-20'>
        <Clock onMessage={handleTime} />
        <select name="" id="MyLanguage" className='bg-slate-100 text-black font-semibold text-xl rounded-lg p-2' onChange={handleLanguageChange} value={id} style={{ border: '1px solid grey' }} disabled>
          <option value="php">PHP</option>
          <option value="javascript">React</option>
          <option value="python">Python</option>
          <option value="dart">Dart</option>
          <option value="typescript">Typescript</option>
        </select>
      </div>
      <div className='main h-screen'>
        <div className="container2 m-auto">
          <h1 className='text-xl mt-[2px]'>MCQ Questions</h1>
          <hr className='bg-lime-950' />
          {result ? <></> :
            <>
              <h2>{index + 1}. {question?.question}</h2>
              <ul>
                <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question?.option1}</li>
                <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question?.option2}</li>
                <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question?.option3}</li>
                <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question?.option4}</li>
              </ul>
              <button className='hover:bg-red-900 hover:text-slate-200' onClick={next}>Next</button>
              <div className="index items-center pb-[1px] text-2xl flex justify-center mb-1">{index + 1} out of {questions.length} questions</div>
            </>}
          {result ? <>
            <h2>You Scored {score} out of {questions.length}</h2>
            <button style={{ marginTop: '2px', paddingTop: '3px', marginLeft: '15px' }} onClick={handleclick}>Next</button>
          </> : <></>}
        </div>
      </div>
    </div>
    }
    </>
  );
}
