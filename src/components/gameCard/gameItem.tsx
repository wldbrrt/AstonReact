import { getCurrentDate } from '../../features/getCurrentDate'
import {
    IHistoryQueryParams,
    IUserFavoritesProps,
} from '../../types/firestoreApiTypes'
import { BackButton } from '../backButton/backButton'
import React from 'react'

interface IGameItem {
    name: string
    gameId: number
    rating: number
    releaseDate: string
    image: string
    description: string
    isAuth: boolean
    isInFavorites?: boolean
    triggerUpdate: (value: IUserFavoritesProps) => void
    triggerGet: (value: IHistoryQueryParams) => void
    email: string | null
}

export const GameItem = ({
    name,
    gameId,
    rating,
    releaseDate,
    image,
    description,
    isAuth,
    isInFavorites,
    triggerUpdate,
    triggerGet,
    email,
}: IGameItem) => {
    return (
        <>
            <BackButton />
            <div className='game'>
                <h2 className='game__name'>{name}</h2>
                <span className='game__rating'>Rating: {rating}/5</span>
                <span className='game__date'>Released date:{releaseDate}</span>
                <img
                    className='game__img'
                    src={image}
                    alt={name}
                />
                <button
                    disabled={!isAuth || isInFavorites}
                    className='game__add'
                    onClick={() => {
                        triggerUpdate({
                            id: String(gameId),
                            email: email,
                            name: name,
                            background_image: image,
                            date: getCurrentDate(),
                        })
                        triggerGet({ email: email })
                    }}
                >
                    {isInFavorites ? 'In Favorites' : `Add to Favorite`}
                </button>
                <span className='game__description'>{description}</span>
            </div>
        </>
    )
}
