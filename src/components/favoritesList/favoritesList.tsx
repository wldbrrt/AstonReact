import {
    useGetUserFavoritesQuery,
    useLazyDeleteUserFavoritesQuery,
    useLazyGetUserFavoritesQuery,
} from '../../api/firestoreApi'
import { useAuthorization } from '../../store/hooks'
import { Loader } from '../loader/loader'
import { GameCardPreview } from '../gameCardPreview/gameCardPreview'
import { BackButton } from '../backButton/backButton'
import React from 'react'
import './favoritesList.css'

function FavoritesList() {
    const { email } = useAuthorization()
    const [triggerDelete] = useLazyDeleteUserFavoritesQuery()
    const [triggerGet] = useLazyGetUserFavoritesQuery()
    const { data, isSuccess, isLoading, isFetching, isError } =
        useGetUserFavoritesQuery({ email: email })

    const onClickHandler = async (
        e: React.MouseEvent<HTMLElement>,
        id: number
    ) => {
        e.stopPropagation()
        triggerDelete({ email: email, id: String(id) })
        triggerGet({ email: email })
    }

    let content
    if (isLoading || isFetching) {
        content = <Loader />
    } else if (isSuccess) {
        const dataArr = Object.values(data)
        if (isSuccess && !dataArr.length) {
            return <div className='favorites'>Nothing was found</div>
        }
        content = dataArr.map(game => (
            <GameCardPreview
                key={game.id}
                id={game.id}
                image={game.background_image}
                name={game.name}
                released={game.date}
                isFauvorite={true}
                favoriteOnClickHandler={onClickHandler}
            />
        ))
    } else if (isError) {
        content = <div>Something went wrong</div>
    }

    return (
        <>
            <BackButton />
            <div className='favorites'>{content}</div>
        </>
    )
}

export { FavoritesList }
