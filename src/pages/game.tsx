import { useAppDispatch } from '../store/hooks'
import { GameCard } from '../components/gameCard/gameCard'
import { setUser } from '../store/slices/user'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import './game.css'

function Game() {
    const { id } = useParams()
    const gameId = Number(id)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                    })
                )

                navigate(`/Game/${id}`)
            } else {
                navigate('/SignIn')
            }
        })
    }, [])

    return <GameCard gameId={gameId} />
}

export { Game }
