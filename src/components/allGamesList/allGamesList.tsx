import { useGetGamesQuery } from '../../api/gamesAPI'
import { Loader } from '../loader/loader'
import { GameCardPreview } from '../gameCardPreview/gameCardPreview'
import { gamePlatforms } from '../../constants/gamePlatforms'
import { useSearchParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import './allGamesList.css'

interface GameListProps {
    size: number
    isLastPageSetter: (value: boolean) => void
}

function AllGamesList({ size, isLastPageSetter }: GameListProps) {
    const [value] = useSearchParams()
    const { data, isLoading, isFetching, isSuccess, isError } =
        useGetGamesQuery({
            pageNumber: Number(value.get('page')) || 1,
            pageSize: size,
            gameName: value.get('search') || '',
        })

    useEffect(() => {
        if (data) isLastPageSetter(Boolean(!data.next))
    }, [data])

    let content
    if (isLoading || isFetching) {
        content = <Loader />
    } else if (isSuccess && !data?.count) {
        content = 'Nothing has found'
    } else if (isSuccess) {
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
