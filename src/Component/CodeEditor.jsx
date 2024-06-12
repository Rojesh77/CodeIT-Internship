import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Box, HStack, Button, Text } from '@chakra-ui/react';
import LanguageSelector from './LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import Output from './Output';
import questions from './questions.json';
import { executeCode } from "../api";
import Clock from "./Clock"
import {saveAs} from "file-saver"
import Completed from './Completed';
import { useLocation ,useNavigate } from 'react-router-dom';
import NotCompleted from './NotCompleted';


const CodeEditor = ({handleDownloadClick }) => {
  const location = useLocation()
  const {otp, imageURL, file ,email ,isCompletes ,score} = location.state || {};
  const loc = useLocation()
  const navigate = useNavigate()
  const {clock} = loc.state || {};
  // console.log(language)
  const[myOtp ,setMyOtp] = useState(false)
  const [rerendered , setReRendered] = useState(false);

  useEffect(() =>{
    if(otp){
      setMyOtp(true);
      // otp=
    }
   
  },[])

  useEffect(() => {
    if (isCompletes === true) {
      setIsComplete(true);
    }
  }, [isCompletes]);
  // console.log(clock)
  // console.log(imageURL);
  // console.log(email)
  console.log(score)
  const [isLoading, setIsLoading] = useState(false);
  // console.log(file)
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [outputValue, setOutputValue] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [test, setTest] = useState(''); // Define test state to store the test of the current question
  const [functions , setFunctions] = useState(''); //For storing the function associated with the question
  const [testValue,setTestValue] = useState('')
  const[isComplete, setIsComplete] = useState(false)
  
  const marks = useRef(0)
  const answers = useRef([]);  // Initialize as an empty array
  const editorRef = useRef(null);
  const randomQuestions = useRef([]);
  var totalquestion ;
  var marks_of_each_question = 2;
  // console.log(remainingTime)
  const getRandomQuestions = () => {
    const tempRandomQuestions = [];
    while (tempRandomQuestions.length < 5) {
      const randomIndex = Math.floor(Math.random() * questions.questions.length);
      const randomQuestion = questions.questions[randomIndex];
      if (!tempRandomQuestions.find((q) => q.question === randomQuestion.question)) {
        tempRandomQuestions.push(randomQuestion);
      }
    }
    console.log(tempRandomQuestions)
    totalquestion = tempRandomQuestions;
    setTest(tempRandomQuestions[0].test); 
    setFunctions(tempRandomQuestions[0].functions); 
    return tempRandomQuestions;
  };
  let filename = 'Your_answer.txt'
  const downloadFile = () => { //This function is to download the answer
    let content = '';
    answers.current.forEach((qa, index) => {
      content += `Question ${index + 1}: ${qa.question}  [ ${qa.youransweris} ]\nAnswer:\n${qa.answer}\n\n`;
    });
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
  };
  // console.log("Hi");
  useEffect(() => {
    randomQuestions.current = getRandomQuestions();
    setCurrentQuestionIndex(1);
    setLanguage(localStorage.getItem('selectedLanguage'))
  }, []);

  useEffect(() => {
    console.log("VALUE:", testValue);
  }, [testValue]); //if there is any change in testValue then do console.log
  

  useEffect(() => {
    // Reset editor and output value when question changes
    setValue(CODE_SNIPPETS[language]);
    
  }, [currentQuestionIndex ,language]);

  const fetchQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      setTest(randomQuestions.current[prevIndex + 1].test); 
      // Bfor updating the CurrentQuestionIndex,Update test with the new question
      setFunctions(randomQuestions.current[prevIndex + 1].functions); 
      return prevIndex + 1;
    });
  };
 
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    setCurrentQuestionIndex(0);
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const logOutputValue = (output) => {
    setOutputValue(output);
  };

  const validateFunction = async (ICode , testCases , func) => {
    // Define the pattern to capture the function name dynamically
    let functionRegex,findLargest;
    setIsLoading(true);

    // FOR JAVASCRIPT#########################################################
    if (language === 'javascript' ){
      functionRegex = new RegExp("function " + func + "\\((.*?)\\)\\s*{([\\s\\S]*)}");
      const findLargestss = ICode.toString().match(functionRegex);
    // console.log(findLargestss)
    if (!findLargestss) {
        alert("Given function in question not found");
        setIsLoading(false)
        throw new Error("Function not found")
        
    }
    for (const { input, expectedOutput } of testCases) {
      let find ,find2, output,lines;

      if (typeof(input) === "object") {
          if (Array.isArray(input) && Array.isArray(input[0])) { //if input is like [[1,2,3]] then convert to [1,2,3]
          const inputString = JSON.stringify(input[0]); 
          find = `console.log( ${func}(${inputString}))`; 
          find2 = `${func}(${inputString})`; 

          } 
          else if (Array.isArray(input)) { //if input is in the form of [1,2,3] then convert to [1,2,3]
            const inputString = input.join(','); 
            find = `console.log( ${func}(${inputString}))`; 
            find2 = `${func}(${inputString})`; 
          }
        console.log(find);
      } else {
          find = `console.log( ${func}("${input}"))`;
          find2 = `${func}("${input}")`;
          console.log(find)
        }
        const finalCode = ICode + '\n\n\n\n' + find  + '\n\n\n\n' + find2 ;
        // setValue(finalCode)
        await executeCode("typescript", finalCode)
        .then((response) => {
              // console.log(response)
                output = response.run.output?.trim();
                // Split the output by lines
                lines = response.run.output.split("\n");
                })
                if (output) {
                      
                  const result = lines[lines.length-1] //ACCESSING THE  LAST ELEMENT FROM ARRAY OF LINES
                  const result2 = lines[lines.length-2] //ACCESSING THE SECOND LAST ELEMENT FROM ARRAY OF LINES
                  
                  if (result !== expectedOutput.toString() && result2 !== expectedOutput.toString()) {
                              console.error(`Test failed for input: ${input}, Expected output: ${expectedOutput}, Actual output: ${result}`);
                              return false; // Function failed the test case
                          }
                  else if(result === expectedOutput.toString() || result2 === expectedOutput.toString()) {
                            console.log(`Test successfully done for input: ${input}, Expected output: ${expectedOutput}, Actual output: ${result}`)
                  }
                }
                 
                else {
                    console.error("No output received from the Python script.");
                }
    }

    
     console.log('All test cases passed successfully.');
    marks.current = marks.current + marks_of_each_question
    console.log("Congrat!Your new marks is "+ marks.current)
    return true; // Function passed all test cases

    }
   



     
    // ####FOR PYTHON#####################
    else if (language === 'python') {

      functionRegex = new RegExp(`def\\s+${func}\\((.*?)\\)\\s*:\\s*([\\s\\S]*?)(?=(?:\\n\\n|\\Z))`);
        const findLargestMatch = ICode.match(functionRegex);
        console.log(findLargestMatch)
        if (!findLargestMatch) {
            setIsLoading(false)
            throw new Error("Function not found");
        }

        const [, parameters, body] = findLargestMatch;

        for (const { input, expectedOutput } of testCases) {
            let find,find2 , output,lines;

            if (typeof(input) === "object") {
                if (Array.isArray(input) && Array.isArray(input[0])) { //if input is like [[1,2,3]] then convert to [1,2,3]
                const inputString = JSON.stringify(input[0]); 
                find = `print( ${func}(${inputString}))`; 
                find2 = `${func}(${inputString})`; 

                } 
                else if (Array.isArray(input)) { //if input is in the form of [1,2,3] then convert to [1,2,3]
                  const inputString = input.join(','); 
                  find = `print( ${func}(${inputString}))`; 
                  find2 = `${func}(${inputString})`; 
                }
              console.log(find);
            } else {
                find = `print( ${func}("${input}"))`;
                find2 = `${func}("${input}")`;
                console.log(find)
              }
              const finalCode = ICode + '\n\n\n\n' + find+ '\n\n\n\n' + find2 ;
              // setValue(finalCode)
              await executeCode("python", finalCode)
              .then((response) => {
                    // console.log(response)
                      output = response.run.output?.trim();
                      // Split the output by lines
                      lines = response.run.output.split("\n");
                      })
                      if (output) {
                      
                        const result = lines[lines.length-1] //ACCESSING THE  LAST ELEMENT FROM ARRAY OF LINES
                        const result2 = lines[lines.length-2] //ACCESSING THE SECOND LAST ELEMENT FROM ARRAY OF LINES
                        
                        if (result !== expectedOutput.toString() && result2 !== expectedOutput.toString()) {
                                    console.error(`Test failed for input: ${input}, Expected output: ${expectedOutput}, Actual output: ${result}`);
                                    return false; // Function failed the test case
                                }
                        else if(result === expectedOutput.toString() || result2 === expectedOutput.toString()) {
                                  console.log(`Test successfully done for input: ${input}, Expected output: ${expectedOutput}, Actual output: ${result}`)
                        }
                      }
                       
                      else {
                          console.error("No output received from the Python script.");
                      }
          }
                marks.current = marks.current + marks_of_each_question
                          console.log("Congrat!Your new marks is "+ marks.current)
                          return true; // F
      
        
    }
  
    // FOR TYPESCRIPT###################################
    else if (language === 'typescript') {
      // const functionRegex = new RegExp(`function\\s+${func}\\s*\\((.*?)\\s*(:\\s*\\w+)?\\)\\s*(:\\s*\\w+)?\\s*\\{([^]*)\\}`);
      // const findLargestss = ICode.toString().match(functionRegex);
      // if (!findLargestss) {
      //   setIsLoading(false)
      //   alert("Given function in question not found");
      //   throw new Error("Function not found");
      // }
      // console.log(findLargestss)
      
      for (const { input, expectedOutput } of testCases) {
        let find ,find2, output,lines;

        if (typeof(input) === "object") {
            if (Array.isArray(input) && Array.isArray(input[0])) { //if input is like [[1,2,3]] then convert to [1,2,3]
            const inputString = JSON.stringify(input[0]); 
            find = `console.log( ${func}(${inputString}))`;
            find2 =  ` ${func}(${inputString})`

            } 
            else if (Array.isArray(input)) { //if input is in the form of [1,2,3] then convert to (1,2,3)
              const inputString = input.join(','); 
              find = `console.log( ${func}(${inputString}))`; 
              find2 = ` ${func}(${inputString})`; 
            }
          console.log(find);
        } else {
            find = `console.log( ${func}("${input}"))`;
            find2 = `${func}("${input}")`
            console.log(find)
          }
          const finalCode = ICode + '\n\n\n\n' + find + '\n\n\n\n' + find2;
          // setValue(finalCode)
          await executeCode("typescript", finalCode)
          .then((response) => {
                console.log(response)
                  output = response.run.output?.trim();
                  // Split the output by lines
                  lines = response.run.output.split("\n");
                  })
                  if (output) {
                      
                    const result = lines[lines.length-1] //ACCESSING THE  LAST ELEMENT FROM ARRAY OF LINES
                    const result2 = lines[lines.length-2] //ACCESSING THE SECOND LAST ELEMENT FROM ARRAY OF LINES
                    
                    if (result !== expectedOutput.toString() && result2 !== expectedOutput.toString()) {
                                console.error(`Test failed for input: ${input}, Expected output: ${expectedOutput}, Actual output: ${result}`);
                                return false; // Function failed the test case
                            }
                    else if(result === expectedOutput.toString() || result2 === expectedOutput.toString()) {
                              console.log(`Test successfully done for input: ${input}, Expected output: ${expectedOutput}, Actual output: ${result}`)
                    }
                  }
                  else {
                      console.error("No output received from the Python script.");
                  }
      }
            marks.current = marks.current + marks_of_each_question
                      console.log("Congrat!Your new marks is "+ marks.current)
                      return true; 
      } 


      //FOR PHP LANGUAGE ############################################
      else if (language === "php"){
        // alert("Be sure to add opening tag <?php in the beginning and ?> in the last line of code")
        // const functionRegex = new RegExp(`function\\s+${functions}\\s*\\((.*?)\\)\\s*\\{([^}]*)\\}`, 's');
        // const findLargestss = ICode.toString().match(functionRegex);
        // // console.log(findLargestss)
        // if (!findLargestss) {
        //   setIsLoading(false)
        //   throw new Error("Function not found");
          
        // }
        for (const { input, expectedOutput } of testCases) {
          let find ,find2, output,lines;

          if (typeof(input) === "object") {
              if (Array.isArray(input) && Array.isArray(input[0])) { //if input is like [[1,2,3]] then convert to [1,2,3]
              const inputString = JSON.stringify(input[0]); 
              find = `echo "\n". ${func}(${inputString});`; 
              find2 = ` ${func}(${inputString});`

              } 
              else if (Array.isArray(input)) { //if input is in the form of [1,2,3] then convert to [1,2,3]
                const inputString = input.join(','); 
                find = `echo "\n". ${func}(${inputString});`; 
                find2 = `${func}(${inputString});`; 
              }
            // console.log(find);
          } else {
              find = `echo "\n". ${func}("${input}");`;
              find2 = `${func}("${input}");`;
              // console.log(find)
            }
            const liness = ICode.split('\n')

            const linesss = liness.filter(str => str.trim() !== ""); //This will remove all the white spaces from linesss
            // console.log(linesss)
            // Find the index of the second last element
            let LastIndex = linesss.length - 1;

            // Removing all the white space before ?>
            let LastLine = linesss[LastIndex].trim(); 
            console.log(LastLine)
            if(LastLine ==="?>"){ //It will be removing ?> from the last line of code
              linesss.splice(LastIndex,1);
            }
            // console.log(linesss)
            let modifiedCode = linesss.join("\n");
            // console.log(modifiedCode)
            const finalCode = modifiedCode + '\n\n\n\n' + find+ '\n\n\n\n' + find2;
            // console.log(finalCode)
            // setValue(finalCode)
            await executeCode("php", finalCode)
            .then((response) => {
              // console.log(response)
                  console.log(response)
                    output = response.run.output?.trim();
                    // Split the output by lines
                    lines = response.run.output.split("\n");
                    // console.log(lines)
                    })
                    if (output) {
                      
                        const result = lines[lines.length-1] //ACCESSING THE  LAST ELEMENT FROM ARRAY OF LINES
                        const result2 = lines[lines.length-2] //ACCESSING THE SECOND LAST ELEMENT FROM ARRAY OF LINES
                        
                        if (result !== expectedOutput.toString() && result2 !== expectedOutput.toString()) {
                                    console.error(`Test failed for input: ${input}, Expected output: ${expectedOutput}, Actual output: ${result}`);
                                    return false; // Function failed the test case
                                }
                        else if(result === expectedOutput.toString() || result2 === expectedOutput.toString()) {
                                  console.log(`Test successfully done for input: ${input}, Expected output: ${expectedOutput}, Actual output: ${result}`)
                        }
                    }
                     
                    else {
                        console.error("No output received from the Python script.");
                    }
        }
              marks.current = marks.current + marks_of_each_question
                        console.log("Congrat!Your new marks is "+ marks.current)
                        return true; // F
      }

      
      //FOR DART LANGUAGE ############################################
      else if (language === "dart"){
        
        const functionRegex = new RegExp(`(?:\\w+\\s+)?(\\w+)\\s+${func}\\s*\\((.*?)\\)\\s*\\{([^}]*)\\}`, 's');
        const findLargestss = ICode.toString().match(functionRegex);
        // console.log(findLargestss)
        if (!findLargestss) {
          setIsLoading(false)
          throw new Error("Function not found");
        }
        for (const { input, expectedOutput } of testCases) {
          let find ,find2, output,lines;

          if (typeof(input) === "object") {
              if (Array.isArray(input) && Array.isArray(input[0])) { //if input is like [[1,2,3]] then convert to [1,2,3]
              const inputString = JSON.stringify(input[0]); 
              find = `   print(${func}(${inputString}));`; 
              find2 = `   ${func}(${inputString});`; 

              } 
              else if (Array.isArray(input)) { //if input is in the form of [1,2,3] then convert to [1,2,3]
                const inputString = input.join(','); 
                find = `   print(${func}(${inputString}));`; 
                find2 = `   ${func}(${inputString});`; 
              }
            // console.log(find);
          } else {
              find = `   print(${func}("${input}"));`;
              find2 = `   ${func}("${input}");`;
              // console.log(find)
            }
            const liness = ICode.split('\n')

            const linesss = liness.filter(str => str.trim() !== ""); //This will remove all the white spaces from 
            let LastIndex = linesss.length - 1;

            // Removing all the white space before }
            let LastLine = linesss[LastIndex].trim(); 
            console.log(LastLine)
            if(LastLine ==="}"){ //It will be removing ?> from the last line of code
              linesss.splice(LastIndex,1);
            }
           
            let modifiedCode = linesss.join("\n");
            // console.log(modifiedCode)
            const finalCode = modifiedCode + '\n\n\n\n' + find + '\n\n\n\n'+ find2 + '\n }';
            // console.log(finalCode)
            // setValue(finalCode)
            await executeCode("dart", finalCode)
            .then((response) => {
              // console.log(response)
                  console.log(response)
                    output = response.run.output?.trim();
                    // Split the output by lines
                    lines = response.run.output.split("\n");
                    
                    })
                    if (output) {
                      
                      const result = lines[lines.length-1] //ACCESSING THE  LAST ELEMENT FROM ARRAY OF LINES
                      const result2 = lines[lines.length-2] //ACCESSING THE SECOND LAST ELEMENT FROM ARRAY OF LINES
                      
                      if (result !== expectedOutput.toString() && result2 !== expectedOutput.toString()) {
                                  console.error(`Test failed for input: ${input}, Expected output: ${expectedOutput}, Actual output: ${result}`);
                                  return false; // Function failed the test case
                              }
                      else if(result === expectedOutput.toString() || result2 === expectedOutput.toString()) {
                                console.log(`Test successfully done for input: ${input}, Expected output: ${expectedOutput}, Actual output: ${result}`)
                      }
                    }
                    else {
                        console.error("No output received from the Python script.");
                    }
        }
              marks.current = marks.current + marks_of_each_question
                        console.log("Congrat!Your new marks is "+ marks.current)
                        return true; // F
      }

      
  
    };

    



  const handleSubmit = async() => {
    // console.log(downloadCV)
    try{ //Make try catch block at last
     const currentQuestion = randomQuestions.current[currentQuestionIndex];
     console.log(currentQuestionIndex)
     console.log("currentQuestion.answer:", currentQuestion.answer);
     console.log("currentQuestion.test:", currentQuestion.test);
     console.log("currentQuestion.functions:", currentQuestion.functions);
     console.log("Output value:", outputValue);
     console.log("Language:", language);
    
     const isSuccess = await validateFunction(value, currentQuestion.test, currentQuestion.functions);
      
     if (isSuccess) {
       setIsLoading(false)
       const yourans = 'STATUS :CONGRATULATION ! THIS ANSWER WAS CORRECT'
       answers.current.push({ question: currentQuestion.question, answer: value ,youransweris :yourans });
       console.log(answers)
     }
     else if(!isSuccess){
       setIsLoading(false)
       const yourans = 'STATUS : SORRY ! THIS ANSWER WAS INCORRECT'
       answers.current.push({ question: currentQuestion.question, answer: value ,youransweris :yourans });
       console.log(answers)
     }
    
    //  TO EXECUTE THE CODE
    
     if (currentQuestionIndex < randomQuestions.current.length - 1) {
       fetchQuestion();
     } else if (currentQuestionIndex === randomQuestions.current.length - 1) {
        setIsComplete(true)
        // downloadFile();
        //  window.location.href = "/Completed";
        alert("Congratulation! You got " + marks.current )
     }
   }
   catch(error){
    console.log("Error")
    console.log(error.message)
    alert("Error :" + error.message)
   }
  
   
  };
  const handleTime = (clocktime) =>{
    
    // console.log(typeof(clocktime))
    if(clocktime === 0){
      setIsComplete(true)
      // downloadFile();
      // console.log(clocktime)
      alert("Ooppss!You ranned out of time")
      // window.location.href = '/Completed'
    }
    
  }
  
  if (isComplete) {  //if the question is completed
    const total_marks = 15; //Total marks of MCQ(1 marks each) + CodeEditor(2 marks each)
    const last_total = marks.current + score 
    const threshold = (total_marks/2)
    console.log(last_total)
    console.log(threshold)
    if(last_total >= threshold)
      {
        // console.log("Yes")
        // console.log(imageURL)
        // downloadCV();
        // setMyOtp(false)
        return <Completed imageURL={imageURL} file={file} downloadFile={downloadFile} email={email} />;
    
      }
    else{
      console.log("No")
      // setMyOtp(false)
      
      return <NotCompleted downloadFile={downloadFile} />
    }
    
  }

  return (

    <>
    {!myOtp && 
    <div className='m-3'>
      <h1  className='text-xl font-semibold text-white'>Login Yourself first</h1>
      <button className='text-lg bg-red-700 border border-teal-700 rounded-lg text-white hover:bg-teal-700 px-2 mt-3' onClick={()=>{navigate('/fileuploadpage')}}>Return to login page</button>
    </div>
    }
    {myOtp &&
    <Box >
      <HStack spacing={2}>
        <Box w="50%">
        <div className='flex space-x-10'>
          <div className='mr-[60px]'>
          <select name="" id="MyLanguage" className='bg-slate-100 text-black font-semibold text-sm rounded-lg p-2' value={language} style={{ border: '1px solid grey' }} disabled>
              <option value="php">PHP</option>
              <option value="javascript">React</option>
              <option value="python">Python</option>
              <option value="dart">Dart</option>
              <option value="typescript">Typescript</option>
          </select>
            {/* <LanguageSelector language={language}  onSelect={onSelect} className='font-semibold text-xl bg-slate-300 rounded-lg' /> */}
          </div>
          
          <div className='h-[60px] w-[120px]  text-orange-400 opacity-75   flex justify-center mt-8'>
            <Clock onMessage={handleTime} clock={clock}/>
          </div>
        </div>
          <Text as="span" color="gray.500" fontSize="lg"  >
            {currentQuestionIndex < randomQuestions.current.length
              ? randomQuestions.current[currentQuestionIndex].question
              : 'End'}
          </Text>
          <Editor
            height="68vh"
            language={language}
            theme="vs-dark"
            defaultValue={CODE_SNIPPETS[language]}
            value={value}
            onChange={(value) => setValue(value)}
            onMount={onMount}
            
          />
          <Button mt={1} colorScheme="teal" onClick={handleSubmit} isLoading={isLoading}>
            Submit
          </Button>
        </Box>
        <Output editorRef={editorRef} language={language} passOutput={logOutputValue} value={value} test={test} functions = {functions}/>
        
      </HStack>
    </Box>
    }
    </>
    
  );
};

export default CodeEditor;
