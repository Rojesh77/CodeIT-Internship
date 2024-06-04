// import logo from './logo.svg';
// import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home'
import Quiz from './components/Quiz'
import About from './components/About'
import Contact from './components/Contact'
import Codeeditor from './components/Codeeditor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/codeeditor" element={<Codeeditor/>} />
      </Routes>
    </Router>
  );
}
export default App;
