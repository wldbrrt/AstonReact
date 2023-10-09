import { Header } from './components/header/header'
import { SignUp } from './pages/signup'
import { SignIn } from './pages/signin'
import { useAuthorization, useFirebaseAuth } from './store/hooks'
import { Loader } from './components/loader/loader'
import { ErrorBoundary } from 'react-error-boundary'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    HashRouter,
} from 'react-router-dom'
import React, { createContext, lazy, Suspense, useMemo, useState } from 'react'
import './App.css'

const Home = lazy(() => import('./pages/home'))
const Favorites = lazy(() => import('./pages/favorites'))
const History = lazy(() => import('./pages/history'))
const Game = lazy(() => import('./pages/game'))

export type ContextType = {
    lightTheme: boolean
    setLightTheme: (c: boolean) => void
}

export const Theme = createContext<ContextType>({
    lightTheme: true,
    setLightTheme: () => undefined,
})

function App() {
    const { isAuth, isAuthenticating } = useAuthorization()
    useFirebaseAuth()
    const [lightTheme, setLightTheme] = useState(true)
    const memoTheme = useMemo(
        () => ({ lightTheme, setLightTheme }),
        [lightTheme]
    )

    return (
        <Theme.Provider value={memoTheme}>
            <div className={lightTheme ? 'App' : 'App _black'}>
                <HashRouter>
                    <Suspense fallback={<Loader />}>
                        {isAuthenticating ? (
                            <Loader />
                        ) : (
                            <>
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
                                                fallback={
                                                    <div>
                                                        Something went wrong
                                                    </div>
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
                                                    <div>
                                                        Something went wrong
                                                    </div>
                                                }
                                            >
                                                {isAuth ? (
                                                    <Favorites />
                                                ) : (
                                                    <Navigate to={'/SignUp'} />
                                                )}
                                            </ErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path='/History'
                                        element={
                                            <ErrorBoundary
                                                fallback={
                                                    <div>
                                                        Something went wrong
                                                    </div>
                                                }
                                            >
                                                {isAuth ? (
                                                    <History />
                                                ) : (
                                                    <Navigate to={'/SignUp'} />
                                                )}
                                            </ErrorBoundary>
                                        }
                                    />
                                    <Route
                                        path='/Game/:id'
                                        element={
                                            <ErrorBoundary
                                                fallback={
                                                    <div>
                                                        Something went wrong
                                                    </div>
                                                }
                                            >
                                                <Game />
                                            </ErrorBoundary>
                                        }
                                    />
                                </Routes>{' '}
                            </>
                        )}
                    </Suspense>
                </HashRouter>
            </div>
        </Theme.Provider>
    )
}

export { App }
