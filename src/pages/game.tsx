import { GameCard } from '../components/gameCard/gameCard'
import { useParams, Navigate } from 'react-router-dom'
import React from 'react'
import './game.css'

function Game() {
    const { id } = useParams()
    const gameId = Number(id)
    const isUserSignedIn = localStorage.getItem('isUserSignedIn')

    return isUserSignedIn ? (
        <GameCard gameId={gameId} />
    ) : (
        <Navigate to='/SignUp' />
    )
}

export { Game }
