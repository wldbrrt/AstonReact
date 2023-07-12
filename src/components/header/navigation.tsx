import { useAuthorization, useAppDispatch } from "../../store/hooks";
import { removeUser } from "../../store/slices/user";
import { NavLink, useNavigate } from 'react-router-dom';
import React from "react";

function Navigation() {
    const { isAuth, email } = useAuthorization();
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    return isAuth
        ? (
            <div>
                <nav className='header__nav'>
                    <NavLink to='/Favorites'>Favorites</NavLink>
                    <NavLink to='/History'>History</NavLink>
                </nav>
                <button
                    onClick={() => dispatch(removeUser())}
                >
                    Log Out from {email}
                </button>
            </div>
        )
        : (
            <div>
                <button
                    onClick={() => navigate('/SignIn')}
                >
                    Sign In
                </button>
                <button
                    onClick={() => navigate('/SignUp')}
                >
                    Sign Up
                </button>
            </div>
        )
}

export { Navigation }