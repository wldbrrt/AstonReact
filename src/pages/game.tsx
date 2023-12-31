import { GameCard } from '../components/gameCard/gameCard'
import { useParams } from 'react-router-dom'
import React from 'react'

function Game() {
    const { id } = useParams()
    const gameId = Number(id)

    return <GameCard gameId={gameId} />
}

export { Game as default }
