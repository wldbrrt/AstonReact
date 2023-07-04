import { Form } from '../form/form';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/user';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";

function Register() {
    const dispatch = useAppDispatch();

    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    /* token: accessToken */
                }))
                console.log(user)
                //TODO: add navigation to main page
            })
            .catch(console.error)
    };

    return (
        <Form
            title='Sign Up'
            handleClick={handleRegister}
        />
    )
}

export { Register }