import { removeUser, setUser } from './slices/user'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuthorization = () => {
    const { email, token, id, isAuth } = useAppSelector(state => state.user)
    useEffect

    return {
        isAuth,
        email,
        token,
        id,
    }
}

export function useDebounce<T>(value: T | string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value])

    return debouncedValue
}

export const useFirebaseAuth = () => {
    const auth = getAuth()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                    })
                )
                localStorage.setItem('isUserSignedIn', 'true')
            } else {
                dispatch(removeUser())
                localStorage.setItem('isUserSignedIn', '')
                localStorage.setItem('gameName', '')
                localStorage.setItem('pageNumber', '1')
            }
        })
        return unsubscribe()
    }, [])
}
