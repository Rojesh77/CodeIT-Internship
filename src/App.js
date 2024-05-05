// import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
