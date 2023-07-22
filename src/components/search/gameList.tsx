import { useGetGamesQuery } from '../../store/slices/gamesAPI'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import './gameList.css'
import PropTypes from 'prop-types'

interface GameListProps {
    pages: number
    size: number
    name: string
    isInputFocused: boolean
}

function GameList({ pages, size, name, isInputFocused }: GameListProps) {
    const navigate = useNavigate()
    const { data, isLoading, isFetching, isSuccess, isError, error } =
        useGetGamesQuery({ pageNumber: pages, pageSize: size, gameName: name })

    let content
    if (isLoading || isFetching) {
        content = 'LOADING'
    } else if (isSuccess && !data?.count) {
        content = 'Nothing has found'
    } else if (isSuccess) {
        content = data.results.map(game => (
            <div
                key={game.id}
                className='search__item'
                onClick={() => {
                    navigate(`/Game/${game.id}`)
                }}
            >
                <img
                    className='search__img'
                    src={game.background_image}
                    alt={game.name}
                />
                <h2>{game.name}</h2>
                <span>{game.released}</span>
            </div>
        ))
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <div
            className={
                name && isInputFocused
                    ? 'search__list'
                    : 'search__list search__list_hidden'
            }
        >
            {content}
        </div>
    )
}

GameList.propTypes = {
    pages: PropTypes.number,
    size: PropTypes.number,
    name: PropTypes.string,
    isInputFocused: PropTypes.bool,
}

export { GameList }
