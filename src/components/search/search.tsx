import { SearchInput } from './searchInput'
import { GameList } from './gameList'
import { getCurrentDate } from '../../features/getCurrentDate'
import { useAuthorization, useDebounce } from '../../store/hooks'
import {
    useLazyGetUserHistoryQuery,
    useLazyUpdateUserHistoryQuery,
} from '../../api/firestoreApi'
import React, { useState } from 'react'
import './search.css'

interface SearchProps {
    onClickHandler: (gameName: string) => void
    onClickPageReset: (pageNumber: number) => void
}

function Search({ onClickHandler, onClickPageReset }: SearchProps) {
    const { isAuth } = useAuthorization()
    const { email } = useAuthorization()
    const [triggerUpdateData] = useLazyUpdateUserHistoryQuery()
    const [triggerGetData] = useLazyGetUserHistoryQuery()
    const [gameName, setGameName] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const debouncedValue = useDebounce(gameName, 800)

    const searchEventHandler = async () => {
        onClickHandler(gameName)
        onClickPageReset(1)
        setGameName('')
        if (gameName && isAuth) {
            await triggerUpdateData({
                email: email,
                name: gameName,
                date: getCurrentDate(),
            })
            await triggerGetData({
                email: email,
            })
        }
    }

    return (
        <div className='search'>
            <SearchInput
                onChangeHandler={setGameName}
                onFocusHandler={setIsFocused}
                gameName={gameName}
                onKeyDownEvent={searchEventHandler}
            />
            <button
                className='search__button'
                onClick={searchEventHandler}
            >
                Search
            </button>
            <GameList
                pages={1}
                size={5}
                name={debouncedValue}
                isInputFocused={isFocused}
            />
        </div>
    )
}
export { Search }
