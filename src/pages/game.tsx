import { useAuthorization, useGameInfo } from '../store/hooks'
import { useGetSingleGameQuery } from '../store/slices/gamesAPI'
import { Navigate } from 'react-router-dom'
import React from 'react'
import './game.css'

function Game() {
    const { isAuth } = useAuthorization()
    const { id } = useGameInfo()
    const { data } = useGetSingleGameQuery({ gameId: id })

    console.log(data)

    return isAuth ? (
        <div className='game'>
            <h2 className='game__name'>{data?.name}</h2>
            <span className='game__rating'>Rating: {data?.rating}/5</span>
            <span className='game__date'>Released date:{data?.released}</span>
            <img
                className='game__img'
                src={data?.background_image}
                alt={data?.name}
            />
            <span className='game__description'>{data?.description_raw}</span>
        </div>
    ) : (
        <Navigate to='/SignIn' />
    )
}

export { Game }
