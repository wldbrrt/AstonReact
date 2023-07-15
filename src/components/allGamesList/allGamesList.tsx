import { useGetGamesQuery } from '../../store/slices/gamesAPI'
import { useAppDispatch } from '../../store/hooks'
import { setGame } from '../../store/slices/game'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import './allGamesList.css'

interface GameListProps {
    pages: number
    size: number
    name: string
    isLastPageSetter: (value: boolean) => void
}

function AllGamesList({ pages, size, name, isLastPageSetter }: GameListProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { data, isLoading, isFetching, isSuccess, isError, error } =
        useGetGamesQuery({ pageNumber: pages, pageSize: size, gameName: name })

    isLastPageSetter(Boolean(!data?.next))

    let content
    if (isLoading || isFetching) {
        content = 'LOADING'
    } else if (isSuccess && !data?.count) {
        content = 'Nothing has found'
    } else if (isSuccess) {
        content = data.results.map(game => (
            <div
                key={game.id}
                className='allGamesList__item'
                onClick={() => {
                    dispatch(
                        setGame({
                            id: game.id,
                        })
                    )
                    navigate('/Game')
                }}
            >
                <img
                    className='allGamesList__img'
                    src={game.background_image}
                    alt={game.name}
                />
                <h2 className='allGamesList__name'>{game.name}</h2>
                <div className='allGamesList__rating'>
                    Rating: {game.rating} / 5
                </div>
                <span className='allGamesList__date'>
                    Released: {game.released}
                </span>
            </div>
        ))
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return <div className='allGamesList'>{content}</div>
}

export { AllGamesList }
