import './header.css'
import { Navigation } from './navigation'
// import { SwitchButton } from './switchButton'
import logo from '../../assets/GG_logo.svg'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function Header() {
    const navigate = useNavigate()
    return (
        <header className='header'>
            <img
                onClick={() => {
                    navigate({
                        pathname: '/',
                        search: '?search=&page=1',
                    })
                }}
                src={logo}
                alt='logo'
                className='header__logo'
            />
            {/* TODO: пееписать смену темы */}
            {/* <SwitchButton /> */}
            <Navigation />
        </header>
    )
}

export { Header }
