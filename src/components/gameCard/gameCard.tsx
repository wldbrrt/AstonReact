import { useGetSingleGameQuery } from '../../api/gamesAPI'
import { getCurrentDate } from '../../features/getCurrentDate'
import { useAuthorization } from '../../store/hooks'
import {
    useGetUserFavoritesQuery,
    useLazyGetUserFavoritesQuery,
    useLazyUpdateUserFavoritesQuery,
} from '../../api/firestoreApi'
import { Loader } from '../loader/loader'
import React from 'react'
import './gameCard.css'
import PropTypes from 'prop-types'

interface IgameCardProps {
    gameId: number
}

function GameCard({ gameId }: IgameCardProps) {
    const { email, isAuth } = useAuthorization()
    const { data, isLoading, isFetching, isSuccess, isError, error } =
        useGetSingleGameQuery({ gameId: gameId })

    const [trigger] = useLazyUpdateUserFavoritesQuery()
    const [triggerGet] = useLazyGetUserFavoritesQuery()

    let content

    if (isAuth) {
        const { data: dataFav, isSuccess: isSuccessFav } =
            useGetUserFavoritesQuery({ email: email })

        if (isLoading || isFetching) {
            content = <Loader />
        } else if (isSuccess && isSuccessFav) {
            const dataArrFav = Object.values(dataFav)
            const IdsArr = dataArrFav.map(e => {
                return Number(e.id)
            })
            const isInFavorites = IdsArr.includes(gameId)

            content = (
                <div className='game'>
                    <h2 className='game__name'>{data.name}</h2>
                    <span className='game__rating'>
                        Rating: {data.rating}/5
                    </span>
                    <span className='game__date'>
                        Released date:{data.released}
                    </span>
                    <img
                        className='game__img'
                        src={data.background_image}
                        alt={data.name}
                    />
                    <button
                        disabled={!isAuth || isInFavorites}
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
        } else if (isSuccess) {
            content = (
                <div className='game'>
                    <h2 className='game__name'>{data.name}</h2>
                    <span className='game__rating'>
                        Rating: {data.rating}/5
                    </span>
                    <span className='game__date'>
                        Released date:{data.released}
                    </span>
                    <img
                        className='game__img'
                        src={data.background_image}
                        alt={data.name}
                    />
                    <button
                        disabled={!isAuth}
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
    } else if (isLoading || isFetching) {
        content = <Loader />
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
                    disabled={true}
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

GameCard.propTypes = {
    gameId: PropTypes.number,
}

export { GameCard }
