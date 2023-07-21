import {
    useGetUserFavoritesQuery,
    useLazyDeleteUserFavoritesQuery,
    useLazyGetUserFavoritesQuery,
} from '../../store/slices/firestoreApi'
import { useAuthorization } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import './favoritesList.css'

function FavoritesList() {
    const navigate = useNavigate()
    const { email } = useAuthorization()
    const [triggerDelete] = useLazyDeleteUserFavoritesQuery()
    const [triggerGet] = useLazyGetUserFavoritesQuery()
    const { data, isSuccess, isLoading, isFetching, isError } =
        useGetUserFavoritesQuery({ email: email })

    let content
    if (isLoading || isFetching) {
        content = 'LOADING'
    } else if (isSuccess) {
        const dataArr = Object.values(data)
        content = dataArr.map(game => (
            <div
                key={game.id}
                className='favorites__item'
                onClick={() => navigate(`/Game/${game.id}`)}
            >
                <img
                    className='favorites__img'
                    src={game.background_image}
                    alt={game.name}
                />
                <h2 className='favorites__name'>{game.name}</h2>
                <button
                    onClick={async e => {
                        e.stopPropagation()
                        triggerDelete({ email: email, id: String(game.id) })
                        triggerGet({ email: email })
                    }}
                    className='favorites__delete'
                >
                    Remove from favorites
                </button>
                <span className='favorites__date'>Added {game.date}</span>
            </div>
        ))
    } else if (isError) {
        content = <div>Something went wrong</div>
    }

    return <div className='favorites'>{content}</div>
}

export { FavoritesList }
