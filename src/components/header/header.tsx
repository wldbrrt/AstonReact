import './header.css'
import { Navigation } from './navigation'
import { SwitchButton } from './switchButton'
import logo from '../../assets/logo.png'
import { useAuthorization } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import React from 'react'

interface IProps {
    setTheme: (value: string) => void
}

function Header({ setTheme }: IProps) {
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
            <SwitchButton setTheme={setTheme} />
            <Navigation />
        </header>
    )
}

export { Header }
