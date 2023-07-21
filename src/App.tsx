import { Header } from './components/header/header'
import { SignUp } from './pages/signup'
import { SignIn } from './pages/signin'
import { Home } from './pages/home'
import { Game } from './pages/game'
import { History } from './pages/history'
import { Favorites } from './pages/favorites'
import { useFirebaseAuth } from './store/hooks'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import './App.css'

function App() {
    useFirebaseAuth()

    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        path='*'
                        element={<div>WRONG PAGE</div>}
                    />
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
                        element={<Favorites />}
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
