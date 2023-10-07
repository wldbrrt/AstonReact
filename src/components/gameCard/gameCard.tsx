import { GameItem } from './gameItem'
import { useGetSingleGameQuery } from '../../api/gamesAPI'
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
    const { data: dataFav, isSuccess: isSuccessFav } = useGetUserFavoritesQuery(
        { email: email }
    )

    const [trigger] = useLazyUpdateUserFavoritesQuery()
    const [triggerGet] = useLazyGetUserFavoritesQuery()

    let content

    if (isAuth) {
        if (isLoading || isFetching) {
            content = <Loader />
        } else if (isSuccess && isSuccessFav) {
            const dataArrFav = Object.values(dataFav)
            const IdsArr = dataArrFav.map(e => {
                return Number(e.id)
            })
            const isInFavorites = IdsArr.includes(gameId)

            content = (
                <GameItem
                    name={data.name}
                    gameId={gameId}
                    rating={data.rating}
                    releaseDate={data.released}
                    image={data.background_image}
                    description={data.description_raw}
                    isAuth={isAuth}
                    isInFavorites={isInFavorites}
                    triggerUpdate={trigger}
                    triggerGet={triggerGet}
                    email={email}
                />
            )
        } else if (isSuccess) {
            content = (
                <GameItem
                    name={data.name}
                    gameId={gameId}
                    rating={data.rating}
                    releaseDate={data.released}
                    image={data.background_image}
                    description={data.description_raw}
                    isAuth={isAuth}
                    triggerUpdate={trigger}
                    triggerGet={triggerGet}
                    email={email}
                />
            )
        } else if (isError) {
            content = <div>{error.toString()}</div>
        }

        return <div>{content}</div>
    } else if (isLoading || isFetching) {
        content = <Loader />
    } else if (isSuccess) {
        content = (
            <GameItem
                name={data.name}
                gameId={gameId}
                rating={data.rating}
                releaseDate={data.released}
                image={data.background_image}
                description={data.description_raw}
                isAuth={isAuth}
                triggerUpdate={trigger}
                triggerGet={triggerGet}
                email={email}
            />
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
