import './header.css'
import { Navigation } from './navigation'
import { SwitchButton } from './switchButton'
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
                    navigate({
                        pathname: '/',
                        search: '?search=&page=1',
                    })
                }}
                src={logo}
                alt='logo'
                className='header__logo'
            />
            <SwitchButton />
            <Navigation />
        </header>
    )
}

export { Header }
