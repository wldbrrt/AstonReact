import { Input } from './input'
import {
    validateEmail,
    validateRequired,
    validateMinLength,
} from '../../features/validation'

import { useAuthorization } from '../../store/hooks'
import { reduxForm, Field, InjectedFormProps } from 'redux-form'
import React, { useState } from 'react'
import './form.css'

interface FormProps {
    title: string
    handleClick: (email: string, password: string) => void
}

const minPasswordLength = validateMinLength(6)

function RegistrationForm({ title, handleClick }: FormProps) {
    const { isAuth } = useAuthorization()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailInvalid, setIsEmailValid] = useState(true)
    const [isPassInvalid, setIsPassValid] = useState(true)

    return (
        <div className='form__contaiter'>
            <Field
                name='email'
                component={Input}
                type='text'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
                placeholder='Email'
                validate={[validateEmail, validateRequired]}
                setValid={setIsEmailValid}
            />
            <Field
                name='password'
                component={Input}
                type='password'
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
                placeholder='Password'
                validate={[validateRequired, minPasswordLength]}
                setValid={setIsPassValid}
            />
            <button
                className='form__button button'
                disabled={isAuth || isEmailInvalid || isPassInvalid}
                onClick={() => handleClick(email, password)}
            >
                {title}
            </button>
        </div>
    )
}

const Form = reduxForm<InjectedFormProps, FormProps>({
    form: 'registrationForm',
})(RegistrationForm)

export { Form }
