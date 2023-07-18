import { Form } from '../form/form'
import { useAppDispatch } from '../../store/hooks'
import { setUser, setUserHistory } from '../../store/slices/user'
import { database } from '../../firebase'
import {
    browserSessionPersistence,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
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

        await getDoc(doc(database, 'Users', `${email}`))
            .then(res => {
                if (res.exists()) {
                    const data = res.data()
                    dispatch(
                        setUserHistory({
                            history: data.history,
                        })
                    )
                }
            })
            .catch(err => alert(err))
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
