import { Form } from '../form/form'
import { useAppDispatch } from '../../store/hooks'
import { setUser } from '../../store/slices/user'
import { useLazySetUserHistoryQuery } from '../../store/slices/firestoreApi'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function Register() {
    const [trigger] = useLazySetUserHistoryQuery()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleRegister = async (email: string, password: string) => {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                    })
                )
                trigger({ email: email })
            })
            .catch(console.error)
        navigate('/')
    }

    return (
        <Form
            title='Sign Up'
            handleClick={handleRegister}
        />
    )
}

export { Register }
