import { useEffect, useState } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuthorization = () => {
    const { email, token, id } = useAppSelector(state => state.user)

    return {
        isAuth: !!email,
        email,
        token,
        id,
    }
}

export const useUserHistory = () => {
    const { history } = useAppSelector(state => state.user)
    return { history }
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
