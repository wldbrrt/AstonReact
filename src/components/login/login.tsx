import { Form } from '../form/form'
import { handleLoginUser } from '../../api/authentication'
import { useAppDispatch } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function LogIn() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleLogin = handleLoginUser(dispatch, navigate)
    return (
        <Form
            title='Sign In'
            handleClick={handleLogin}
        />
    )
}

export { LogIn }
