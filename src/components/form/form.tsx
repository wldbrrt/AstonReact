import { useState } from 'react';
import React from 'react';

interface FormProps {
    title: string,
    handleClick: (email: string, password: string) => void
}

function Form({ title, handleClick }: FormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
            />
            <button
                onClick={() => handleClick(email, password)}
            >
                {title}
            </button>
        </div>
    )
}

export { Form }