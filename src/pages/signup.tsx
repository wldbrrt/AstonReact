import { Register } from '../components/register/register'
import { Link } from 'react-router-dom'
import React from 'react'

function SignUp() {
    return (
        <div className='form'>
            <h2 className='form__head'>Register</h2>
            <Register />
            <p className='form__tip'>
                Already have account? <Link to='/SignIn'>Log in</Link>
            </p>
        </div>
    )
}

export { SignUp }
