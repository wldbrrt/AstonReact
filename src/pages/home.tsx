import { useAuthorization, useAppDispatch } from '../store/hooks'
import { Search } from '../components/search/search'
import { removeUser } from '../store/slices/user'
import { Navigate } from 'react-router-dom'
import React from 'react'

function Home() {
    const { isAuth } = useAuthorization()

    return isAuth ? (
        <div>
            <Search />
            <h1>WELCOME</h1>
        </div>
    ) : (
        <Navigate to='/SignIn' />
    )
}

export { Home }
