import { Form } from '../form/form'
import { useAppDispatch } from '../../store/hooks'
import { setUser, setUserHistory } from '../../store/slices/user'
import { database } from '../../firebase'
import { setDoc, doc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function Register() {
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
                        /* token: accessToken */
                    })
                )
            })
            .catch(console.error)
        await setDoc(doc(database, 'Users', `${email}`), {
            email: email,
            history: [],
        })
            .then(() => {
                dispatch(
                    setUserHistory({
                        history: [],
                    })
                )
            })
            .catch(err => alert(err))
        localStorage.setItem('isUserSignedIn', 'true')
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
