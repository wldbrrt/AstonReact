import { Header } from './components/header/header'
import { SignUp } from './pages/signup'
import { SignIn } from './pages/signin'
import { Home } from './pages/home'
import { Game } from './pages/game'
import { History } from './pages/history'
import { Favorites } from './pages/favorites'
import { useFirebaseAuth } from './store/hooks'
import { ErrorBoundary } from 'react-error-boundary'
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
                        element={
                            <ErrorBoundary
                                fallback={<div>Something went wrong</div>}
                            >
                                <Home />
                            </ErrorBoundary>
                        }
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
                        element={
                            <ErrorBoundary
                                fallback={<div>Something went wrong</div>}
                            >
                                <Favorites />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path='/History'
                        element={
                            <ErrorBoundary
                                fallback={<div>Something went wrong</div>}
                            >
                                <History />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path='/Game/:id'
                        element={
                            <ErrorBoundary
                                fallback={<div>Something went wrong</div>}
                            >
                                <Game />
                            </ErrorBoundary>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export { App }
