import { AppDispatch } from './../store/store'
import { removeUser, setUser } from '../store/slices/user'
import {
    IHistoryQueryParams,
    IUserUpdatedData,
} from '../types/firestoreApiTypes'
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { NavigateFunction } from 'react-router-dom'
import { BaseQueryFn, QueryDefinition } from '@reduxjs/toolkit/dist/query'
import type { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'

export const handleRegisterUser =
    (
        dispatch: AppDispatch,
        trigger: LazyQueryTrigger<
            QueryDefinition<
                IHistoryQueryParams,
                BaseQueryFn<any, unknown, unknown, object, object>,
                never,
                IUserUpdatedData,
                'api'
            >
        >,
        navigate: NavigateFunction
    ) =>
    async (email: string, password: string) => {
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
                navigate('/')
            })
            .catch(err => {
                alert(err)
            })
    }

export const handleLoginUser =
    (dispatch: AppDispatch, navigate: NavigateFunction) =>
    async (email: string, password: string) => {
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
                navigate(`/`)
            })
            .catch(() => alert('Invalid User'))
    }

export const handleLogOutUser =
    (dispatch: AppDispatch, navigate: NavigateFunction) => async () => {
        const auth = getAuth()
        signOut(auth)
            .then(() => {
                dispatch(removeUser())
                navigate('/SignIn')
            })
            .catch(error => alert(error))
    }
