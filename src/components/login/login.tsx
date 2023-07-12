import { Form } from '../form/form';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/user';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import React from "react";

function LogIn() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    /* token:  accessToken */
                }))
                navigate('/')

            })
            .catch(() => alert('Invalid User'))
    };

    return (
        <Form
            title='Sign In'
            handleClick={handleLogin}
        />
    )
}

export { LogIn }