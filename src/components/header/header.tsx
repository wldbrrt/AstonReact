import './header.css'
import { Navigation } from './navigation'
import logo from '../../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import React from 'react'

function Header() {
    const navigate = useNavigate()
    return (
        <header className='header'>
            <img
                onClick={() => {
                    navigate('/')
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
