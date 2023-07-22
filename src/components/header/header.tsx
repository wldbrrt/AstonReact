import './header.css'
import { Navigation } from './navigation'
import { SwitchButton } from './switchButton'
import logo from '../../assets/logo.png'
import { useAuthorization } from '../../store/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React from 'react'

function Header() {
    const navigate = useNavigate()
    const { isAuth } = useAuthorization()
    const [value, setValue] = useSearchParams()
    return (
        <header className='header'>
            <img
                onClick={async () => {
                    if (isAuth) {
                        navigate({
                            pathname: '/',
                            search: '?search=&page=',
                        })
                    } else {
                        navigate('/SignIn')
                    }
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
