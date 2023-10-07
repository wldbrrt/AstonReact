import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

interface IGameCardPreview {
    id: number
    image: string
    name: string
    rating?: number
    released: string
    favoriteOnClickHandler?: (
        e: React.MouseEvent<HTMLElement>,
        id: number
    ) => void
    isFauvorite?: boolean
    genres?: string[]
    platforms?: string[]
}

export const GameCardPreview = ({
    id,
    image,
    name,
    rating,
    released,
    favoriteOnClickHandler,
    isFauvorite = false,
    genres,
    platforms,
}: IGameCardPreview) => {
    const [isActive, setIsActive] = useState<boolean>()
    const navigate = useNavigate()

    return (
        <div className='allGamesList__wrapper'>
            <div
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)}
                key={id}
                className='allGamesList__item'
                onClick={() => navigate(`/Game/${id}`)}
            >
                {!isFauvorite && genres && platforms && (
                    <div
                        className={
                            isActive
                                ? 'allGamesList__fullInfo allGamesList__fullInfo_Active'
                                : 'allGamesList__fullInfo'
                        }
                    >
                        <div className='allGamesList__fullInfo-description'>
                            <h2 className='allGamesList__name'>{name}</h2>
                            <span className='allGamesList__date_fullInfo'>
                                Released:
                                <br /> {released}
                            </span>
                            <div className='allGamesList__rating_fullInfo'>
                                Rating: {rating} / 5
                            </div>
                            <div className='allgamesList__genres'>
                                {genres.map((e, ind) => (
                                    <div
                                        className='allgamesList__genres-item'
                                        key={ind}
                                    >
                                        {e}
                                    </div>
                                ))}
                            </div>
                            <div className='allgamesList__platforms'>
                                {platforms.map((e, ind) => {
                                    if (e) {
                                        return (
                                            <div
                                                className='allgamesList__platforms-item'
                                                key={ind}
                                            >
                                                {e}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                )}
                <div className='allGamesList__container'>
                    <img
                        className='allGamesList__img'
                        src={image}
                        alt={name}
                    />
                    <div className='allGamesList__description'>
                        <h2 className='allGamesList__name'>{name}</h2>
                        {isFauvorite && favoriteOnClickHandler ? (
                            <button
                                onClick={e => favoriteOnClickHandler(e, id)}
                                className='favorites__delete button'
                            >
                                Remove from favorites
                            </button>
                        ) : (
                            <div className='allGamesList__rating'>
                                Rating: {rating} / 5
                            </div>
                        )}
                        {isFauvorite ? (
                            <span className='allGamesList__date'>
                                Added:
                                <br /> {released}
                            </span>
                        ) : (
                            <span className='allGamesList__date'>
                                Released:
                                <br /> {released}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
