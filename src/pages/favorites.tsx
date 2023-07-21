import { FavoritesList } from '../components/favoritesList/favoritesList'
import { useAuthorization } from '../store/hooks'
import { Navigate } from 'react-router-dom'
import React from 'react'

function Favorites() {
    const { isAuth } = useAuthorization()

    return isAuth ? <FavoritesList /> : <Navigate to='/SignUp' />
}

export { Favorites }
