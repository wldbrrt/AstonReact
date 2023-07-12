import { Register } from '../components/register/register';
import { Link } from 'react-router-dom';
import React from 'react';

function SignUp() {
    return (
        <div>
            <h2>Register</h2>
            <Register />
            <p>Already have account? <Link to='/SignIn'>Log in</Link></p>
        </div>
    )
}

export { SignUp }