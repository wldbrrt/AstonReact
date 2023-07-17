import { useAuthorization } from '../store/hooks'
import { GameCard } from '../components/gameCard/gameCard'
import { Navigate } from 'react-router-dom'
import React from 'react'
import './game.css'

function Game() {
    const { isAuth } = useAuthorization()

    return isAuth ? <GameCard /> : <Navigate to='/SignIn' />
}

export { Game }
