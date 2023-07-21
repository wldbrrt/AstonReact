import { Header } from './components/header/header'
import { SignUp } from './pages/signup'
import { SignIn } from './pages/signin'
import { useFirebaseAuth } from './store/hooks'
import { Loader } from './components/loader/loader'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, {
    createContext,
    lazy,
    Suspense,
    useContext,
    useState,
} from 'react'
import './App.css'

const Home = lazy(() => import('./pages/home'))
const Favorites = lazy(() => import('./pages/favorites'))
const History = lazy(() => import('./pages/history'))
const Game = lazy(() => import('./pages/game'))

export const Theme = createContext('light')

function App() {
    useFirebaseAuth()
    const currentTheme = useContext(Theme)
    const [theme, setTheme] = useState(currentTheme)

    return (
        <div className={theme === 'light' ? 'App' : 'App _black'}>
            <BrowserRouter>
                <Theme.Provider value={theme}>
                    <Suspense fallback={<Loader />}>
                        <Header setTheme={setTheme} />
                        <Routes>
                            <Route
                                path='*'
                                element={<div>WRONG PAGE</div>}
                            />
                            <Route
                                path='/'
                                element={
                                    <ErrorBoundary
                                        fallback={
                                            <div>Something went wrong</div>
                                        }
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
                                        fallback={
                                            <div>Something went wrong</div>
                                        }
                                    >
                                        <Favorites />
                                    </ErrorBoundary>
                                }
                            />
                            <Route
                                path='/History'
                                element={
                                    <ErrorBoundary
                                        fallback={
                                            <div>Something went wrong</div>
                                        }
                                    >
                                        <History />
                                    </ErrorBoundary>
                                }
                            />
                            <Route
                                path='/Game/:id'
                                element={
                                    <ErrorBoundary
                                        fallback={
                                            <div>Something went wrong</div>
                                        }
                                    >
                                        <Game />
                                    </ErrorBoundary>
                                }
                            />
                        </Routes>
                    </Suspense>
                </Theme.Provider>
            </BrowserRouter>
        </div>
    )
}

export { App }
