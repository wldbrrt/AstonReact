import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div>THE ROOT</div>} />
          <Route path='/SignUp' element={<div>SIGN UP</div>} />
          <Route path='/SignIn' element={<div> SIGN IN</div>} />
          <Route path='/Fauvorites' element={<div> FAUFORITES</div>} />
          <Route path='/History' element={<div>HISTORY </div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export { App }
