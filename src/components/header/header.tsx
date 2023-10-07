import './header.css'
import { Navigation } from './navigation'
// import { SwitchButton } from './switchButton'
import logo from '../../assets/GG_logo.svg'
import { useWindowSize } from '../../store/hooks'
import { displaySizes } from '../../constants/displaySizes'
import { BurgerMenu } from '../burgerMenu/burgerMenu'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function Header() {
    const windowSize = useWindowSize()
    const navigate = useNavigate()
    return windowSize[0] > displaySizes.md ? (
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
    ) : (
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
            <BurgerMenu />
        </header>
    )
}

export { Header }
