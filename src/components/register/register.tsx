import { Form } from '../form/form'
import { handleRegisterUser } from '../../api/authentication'

import { useAppDispatch } from '../../store/hooks'
import { useLazySetUserHistoryQuery } from '../../api/firestoreApi'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function Register() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [trigger] = useLazySetUserHistoryQuery()
    const handleRegister = handleRegisterUser(dispatch, trigger, navigate)

    return (
        <Form
            title='Sign Up'
            handleClick={handleRegister}
        />
    )
}

export { Register }
