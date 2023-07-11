import { Input } from './input';
import { validateEmail, validateRequired, validateMinLength } from '../../features/validation';
import { useState } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import React from 'react';

interface FormProps {
    title: string,
    handleClick: (email: string, password: string) => void
}

function RegistrationForm({ title, handleClick }: FormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const minPasswordLength = validateMinLength(6);


    return (
        <div>
            <Field
                name='email'
                component={Input}
                type='text'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder='Email'
                validate={[validateEmail, validateRequired]}
            />
            <Field
                name='password'
                component={Input}
                type='password'
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder='Password'
                validate={[validateRequired, minPasswordLength]}
            />
            <button
                onClick={() => handleClick(email, password)}
            >
                {title}
            </button>
        </div>
    )
}

const Form = reduxForm<InjectedFormProps, FormProps>({
    form: 'registrationForm'
})(RegistrationForm)

export { Form }