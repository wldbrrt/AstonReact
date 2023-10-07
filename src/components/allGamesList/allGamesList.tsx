import { Loader } from '../loader/loader'
import { GameCardPreview } from '../gameCardPreview/gameCardPreview'
import { gamePlatforms } from '../../constants/gamePlatforms'
import { ApiResponse } from '../../types/gamesApiTypes'
import React, { useEffect } from 'react'
import './allGamesList.css'

interface GameListProps {
    isLastPageSetter: (value: boolean) => void
    data: ApiResponse | undefined
    isLoading: boolean
    isFetching: boolean
    isSuccess: boolean
    isError: boolean
}

function AllGamesList({
    isLastPageSetter,
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
}: GameListProps) {
    useEffect(() => {
        if (data) {
            isLastPageSetter(Boolean(!data.next))
        } else {
            isLastPageSetter(true)
        }
    }, [data])

    let content
    if (isLoading || isFetching) {
        content = <Loader />
    } else if (isSuccess && !data?.count) {
        content = 'Nothing has found'
    } else if (isSuccess && data) {
        content = data.results.map(game => {
            const platfromsSet = new Set(
                game.platforms.map(e => gamePlatforms[e.platform.name])
            )
            return (
                <GameCardPreview
                    key={game.id}
                    id={game.id}
                    image={game.background_image}
                    name={game.name}
                    rating={game.rating}
                    released={game.released}
                    genres={game.genres.map(e => e.name)}
                    platforms={Array.from(platfromsSet)}
                />
            )
        })
    } else if (isError) {
        content = <div>{'SOMETHING WENT WRONG'}</div>
    }

    return <div className='allGamesList'>{content}</div>
}

export { AllGamesList }
