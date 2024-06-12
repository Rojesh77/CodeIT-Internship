import React, { useState } from "react";
import { Box, Button, Code, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
export {Code} ;


const Output = ({ editorRef, language, passOutput ,functions}) => { 
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [functionnotFound , setFunctionnotFound] = useState(false)



  const validateFunction = (ICode ,  functions , language ) => {
    // Define the pattern to capture the function name dynamically
    let functionRegex;
    if (language === 'javascript'){
      functionRegex = new RegExp("function " + functions + "\\((.*?)\\)\\s*{([\\s\\S]*)}");
    }
    else if (language === 'typescript'){
       functionRegex = new RegExp("function\\s+" + functions + "\\s*\\((.*?)\\)\\s*:\\s*\\w+\\s*{([\\s\\S]*)}");
    }
    else if (language === 'python'){
      functionRegex = new RegExp(`def\\s+${functions}\\s*\\((.*?)\\)\\s*:\\s*([\\s\\S]*)`);

    }
    else if (language === "php"){
      functionRegex = new RegExp(`function\\s+${functions}\\s*\\((.*?)\\)\\s*\\{([^}]*)\\}`, 's');
    }
    else if (language ==="dart"){
      functionRegex = new RegExp(`(?:\\w+\\s+)?(\\w+)\\s+${functions}\\s*\\((.*?)\\)\\s*\\{([^}]*)\\}`, 's');
    
    }

    // console.log(functionRegex);
    // console.log("function " + functions + "\\((.*?)\\)\\s*{([\\s\\S]*)}");
    // Extract the findLargest function from the provided code
    // const findLargestss = ICode.toString().match(/function findLargest\((.*?)\)\s*{([\s\S]*)}/);
    const functionsss = ICode.toString().match(functionRegex);
    if (!functionsss) {
        alert("Given function in question not found");
        setFunctionnotFound(true);
        return;
    }
   
};


  const runCode = async () => {
   
    
    setFunctionnotFound(false);
    const sourceCode = editorRef.current.getValue();
    console.log(language);

    //YESLAI LAST MA UNCOMMENT GARNEY
    // validateFunction(sourceCode , functions , language); //Source code ma function xianah vaney yesle warn garxa

    // console.log(test)
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      passOutput(result.output); // passing output to other files
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
    // console.log(test)
    
  };
  
  return (
    <Box w="40%">

      {/* code for output box */}
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading} 
        // isLoading will give a loading effect when the function is executing
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
      height="30vh"
      p={2}
      color={isError || functionnotFound ? "red.400" : ""}
      border="1px solid"
      borderRadius={4}
      borderColor={isError || functionnotFound ? "red.500" : "#333"}
      mb={3}
      overflow="auto"
    >
      
      {functionnotFound && (
        <Text mt={2} color="blue.400">
          Please include the given function in the question,otherwise your answer will not be valid
          
        </Text>
        // if findNumberAfterReturn is true then it will show this text
      )}

      {output ? (
        output.map((line, i) => <Text key={i}>{line}</Text>)
      ) : (
        'Click "Run Code" to see the output here'
      )}
    </Box>
    </Box>
    
  );
};

export default Output;

