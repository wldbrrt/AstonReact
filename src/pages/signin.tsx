import { LogIn } from '../components/login/login'
import { Link } from 'react-router-dom';
import React from 'react';


function SignIn() {
    return (
        <div>
            <h2>Log In</h2>
            <LogIn />
            <p>Dont have account yet? <Link to='/SignUp'>Register</Link></p>
        </div>
    )
}

export { SignIn }