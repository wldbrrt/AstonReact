import { removeUser, setUser } from './slices/user'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useLayoutEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuthorization = () => {
    const { email, token, id, isAuth, isAuthenticating } = useAppSelector(
        state => state.user
    )

    return {
        isAuth,
        email,
        token,
        id,
        isAuthenticating,
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
    const dispatch = useAppDispatch()
    useLayoutEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                    })
                )
            } else {
                dispatch(removeUser())
            }
        })
        return () => unsubscribe()
    }, [])
}

export const useWindowSize = () => {
    const [size, setSize] = useState<Array<number>>([0, 0])
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
}
