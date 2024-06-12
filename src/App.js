import { Box } from '@chakra-ui/react'
import React from 'react'
import CodeEditor from './Component/CodeEditor'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Homepage from './Component/Homepage'
import Completed from './Component/Completed'
import Signup from './Component/Signup'
import Login from './Component/Login'
import Clock from './Component/Clock'
import Quiz from './Component/MCQ'
import FileUploadPage from './Component/FileUploadPage'
import Home from './Component/Home'
import Admin from './Component/Admin'
import NotCompleted from './Component/NotCompleted'
import About from './Component/About'
import Contact from './Component/Contact'





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Homepage/>}/> 
        <Route path='/' element={<Home/>}/> 
        <Route path='/admin' element={<Admin/>}/> 
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        {/* <Route path='/completed' element={<Completed/>}/> */}
        {/* <Route path='/notcompleted' element={<NotCompleted/>}/> */}
        <Route path='/clock' element={<Clock/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/fileuploadpage' element={<FileUploadPage/>}/>
        
      </Routes>
    </Router>
    

  )
}

export default App
