import { useAppDispatch, useAuthorization } from '../../store/hooks'
import { handleLogOutUser } from '../../api/authentication'
import { NavLink, useNavigate } from 'react-router-dom'
import React from 'react'
import './navigation.css'

function Navigation() {
    const { email, isAuth } = useAuthorization()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleLogOut = handleLogOutUser(dispatch, navigate)

    return isAuth ? (
        <div className='header__nav'>
            <nav className='header__nav'>
                <NavLink to='/Favorites'>Favorites</NavLink>
                <NavLink to='/History'>History</NavLink>
            </nav>
            <button
                className='header__button'
                onClick={handleLogOut}
            >
                Log Out from {email}
            </button>
        </div>
    ) : (
        <div className='header__nav'>
            <button
                className='header__button'
                onClick={() => navigate('/SignIn')}
            >
                Sign In
            </button>
            <button
                className='header__button'
                onClick={() => navigate('/SignUp')}
            >
                Sign Up
            </button>
        </div>
    )
}

export { Navigation }
