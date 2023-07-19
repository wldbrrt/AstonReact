import { Form } from '../form/form'
import { useAppDispatch } from '../../store/hooks'
import { setUser } from '../../store/slices/user'
import {
    browserSessionPersistence,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function LogIn() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogin = async (email: string, password: string) => {
        const auth = getAuth()
        await setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password)
            })
            .then(({ user }) => {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                    })
                )
            })
            .catch(() => alert('Invalid User'))
        localStorage.setItem('isUserSignedIn', 'true')
        navigate(`/`)
    }

    return (
        <Form
            title='Sign In'
            handleClick={handleLogin}
        />
    )
}

export { LogIn }
