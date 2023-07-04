import { Form } from '../form/form';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/user';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";

function LogIn() {
    const dispatch = useAppDispatch();

    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    /* token:  accessToken */
                }))
                //TODO: add navigation to main page

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