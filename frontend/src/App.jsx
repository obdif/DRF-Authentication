import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import VerifyEmail from './components/VerifyEmail';
import ForgetPassword from './components/ForgetPassword';
import Profile from './components/Profile'; 
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Profile />} />
        <Route path="/otp/verify" element={<VerifyEmail />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
