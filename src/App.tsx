import { Header } from './components/header/header'
import { SignUp } from './pages/signup'
import { SignIn } from './pages/signin'
import { Home } from './pages/home'
import { Game } from './pages/game'
import { History } from './pages/history'
import { useAppDispatch, useFirebaseAuth } from './store/hooks'
import { removeUser, setUser } from './store/slices/user'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import './App.css'

function App() {
    useFirebaseAuth()

    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />
                    <Route
                        path='/SignUp'
                        element={<SignUp />}
                    />
                    <Route
                        path='/SignIn'
                        element={<SignIn />}
                    />
                    <Route
                        path='/Favorites'
                        element={<div> FAUFORITES</div>}
                    />
                    <Route
                        path='/History'
                        element={<History />}
                    />
                    <Route
                        path='/Game/:id'
                        element={<Game />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export { App }
