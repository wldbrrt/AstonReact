import './header.css'
import { Navigation } from './navigation'
import logo from '../../assets/logo.png'
import { useAuthorization } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function Header() {
    const navigate = useNavigate()
    const { isAuth } = useAuthorization()
    return (
        <header className='header'>
            <img
                onClick={() => {
                    isAuth ? navigate('/') : navigate('/SignIn')
                }}
                src={logo}
                alt='logo'
                className='header__logo'
            />
            <Navigation />
        </header>
    )
}

export { Header }
