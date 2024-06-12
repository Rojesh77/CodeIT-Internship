import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { ChakraProvider, theme } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <ChakraProvider theme={theme}>
    
      <App />
    
    </ChakraProvider>
 
)
