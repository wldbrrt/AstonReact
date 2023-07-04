import './header.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import React from 'react';

function Header() {
    return (
        <header className='header'>
            <NavLink to='/'>
                <img src={logo} alt="logo" className='header__logo' />
            </NavLink>
            <nav className='header__nav'>
                <NavLink to='/Favorites'>Favorites</NavLink>
                <NavLink to='/History'>History</NavLink>
            </nav>
            <div className='header__container'>
                <button className='header__button'>Sign In</button>
                <button className='header__button'>Sign Up</button>
            </div>
        </header>
    )
}

export { Header };