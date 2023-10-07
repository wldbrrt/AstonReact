import { useAppDispatch, useAuthorization } from '../../store/hooks'
import { handleLogOutUser } from '../../api/authentication'
import { NavLink, useNavigate } from 'react-router-dom'
import React from 'react'
import './navigation.css'

interface INavigation {
    setIsMenuActive?: (value: boolean) => void
}

function Navigation({ setIsMenuActive }: INavigation) {
    const { email, isAuth } = useAuthorization()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleLogOut = handleLogOutUser(dispatch, navigate)

    return isAuth ? (
        <>
            <nav className='header__nav'>
                <NavLink
                    onClick={() => {
                        if (setIsMenuActive) setIsMenuActive(false)
                    }}
                    className={'header__link header__splitline'}
                    to='/Favorites'
                >
                    Favorites
                </NavLink>

                <NavLink
                    onClick={() => {
                        if (setIsMenuActive) setIsMenuActive(false)
                    }}
                    className={'header__link'}
                    to='/History'
                >
                    History
                </NavLink>
            </nav>
            <button
                className='header__button button'
                onClick={() => {
                    handleLogOut()
                    if (setIsMenuActive) setIsMenuActive(false)
                }}
            >
                Log Out from {email}
            </button>
        </>
    ) : (
        <div className='header__nav header__nav_unauth'>
            <button
                className='header__button button header__button_unauth'
                onClick={() => {
                    navigate('/SignIn')
                    if (setIsMenuActive) setIsMenuActive(false)
                }}
            >
                Sign In
            </button>
            <button
                className='header__button button header__button_unauth'
                onClick={() => {
                    navigate('/SignUp')
                    if (setIsMenuActive) setIsMenuActive(false)
                }}
            >
                Sign Up
            </button>
        </div>
    )
}

export { Navigation }
