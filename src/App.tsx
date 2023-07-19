import { Header } from './components/header/header'
import { SignUp } from './pages/signup'
import { SignIn } from './pages/signin'
import { Home } from './pages/home'
import { Game } from './pages/game'
import { History } from './pages/history'
import { useAppDispatch } from './store/hooks'
import { removeUser, setUser } from './store/slices/user'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react'
import './App.css'

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                    })
                )
                localStorage.setItem('isUserSignedIn', 'true')
            } else {
                dispatch(removeUser())
                localStorage.setItem('isUserSignedIn', '')
                localStorage.setItem('gameName', '')
                localStorage.setItem('pageNumber', '1')
            }
        })
        return unsubscribe()
    }, [])

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
