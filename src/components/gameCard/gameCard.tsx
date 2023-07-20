import { useGetSingleGameQuery } from '../../store/slices/gamesAPI'
import { getCurrentDate } from '../../features/getCurrentDate'
import { useAuthorization } from '../../store/hooks'
import {
    useLazyGetUserFavoritesQuery,
    useLazyUpdateUserFavoritesQuery,
} from '../../store/slices/firestoreApi'
import React from 'react'
import './gameCard.css'

interface IgameCardProps {
    gameId: number
}

function GameCard({ gameId }: IgameCardProps) {
    const { data, isLoading, isFetching, isSuccess, isError, error } =
        useGetSingleGameQuery({ gameId: gameId })

    const [trigger] = useLazyUpdateUserFavoritesQuery()
    const [triggerGet] = useLazyGetUserFavoritesQuery()
    const { email } = useAuthorization()

    let content

    if (isLoading || isFetching) {
        content = 'Is Loading...'
    } else if (isSuccess) {
        content = (
            <div className='game'>
                <h2 className='game__name'>{data.name}</h2>
                <span className='game__rating'>Rating: {data.rating}/5</span>
                <span className='game__date'>
                    Released date:{data.released}
                </span>
                <img
                    className='game__img'
                    src={data.background_image}
                    alt={data.name}
                />
                <button
                    className='game__add'
                    onClick={() => {
                        trigger({
                            id: String(gameId),
                            email: email,
                            name: data.name,
                            background_image: data.background_image,
                            date: getCurrentDate(),
                        })
                        triggerGet({ email: email })
                    }}
                >
                    Add to Favorite
                </button>
                <span className='game__description'>
                    {data.description_raw}
                </span>
            </div>
        )
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return <div>{content}</div>
}

export { GameCard }
