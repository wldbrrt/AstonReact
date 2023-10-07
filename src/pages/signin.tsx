import { LogIn } from '../components/login/login'
import { Link } from 'react-router-dom'
import React from 'react'

function SignIn() {
    return (
        <div className='form'>
            <h2 className='form__head'>Log In</h2>
            <LogIn />
            <p className='form__tip'>
                Dont have account yet?{' '}
                <Link
                    className='form_link'
                    to='/SignUp'
                >
                    Register
                </Link>
            </p>
        </div>
    )
}

export { SignIn }
