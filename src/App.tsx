import { Header } from './components/header/header';
import { SignUp } from './pages/signup';
import { SignIn } from './pages/signin';
import { Home } from './pages/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/Favorites' element={<div> FAUFORITES</div>} />
          <Route path='/History' element={<div>HISTORY </div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export { App }
