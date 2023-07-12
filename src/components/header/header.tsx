import './header.css';
import { Navigation } from './navigation';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import React from 'react';

function Header() {
    return (
        <header className='header'>
            <NavLink to='/'>
                <img src={logo} alt="logo" className='header__logo' />
            </NavLink>
            <Navigation />
        </header>
    )
}

export { Header };