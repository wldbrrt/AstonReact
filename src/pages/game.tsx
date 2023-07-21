import { GameCard } from '../components/gameCard/gameCard'
import { useAuthorization } from '../store/hooks'
import { useParams, Navigate } from 'react-router-dom'
import React from 'react'
import './game.css'

function Game() {
    const { id } = useParams()
    const gameId = Number(id)
    const { isAuth } = useAuthorization()

    return isAuth ? <GameCard gameId={gameId} /> : <Navigate to='/SignUp' />
}

export { Game as default }
