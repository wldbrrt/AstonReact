import { SearchInput } from './searchInput'
import { GameList } from './gameList'
import { getCurrentDate } from '../../features/getCurrentDate'
import { useAuthorization, useDebounce } from '../../store/hooks'
import {
    useGetUserHistoryQuery,
    useLazyGetUserHistoryQuery,
    useLazyUpdateUserHistoryQuery,
} from '../../store/slices/firestoreApi'
import React, { useState } from 'react'
import './search.css'

interface SearchProps {
    onClickHandler: (gameName: string) => void
    onClickPageReset: (pageNumber: number) => void
}

function Search({ onClickHandler, onClickPageReset }: SearchProps) {
    const { email } = useAuthorization()
    const [triggerUpdateData] = useLazyUpdateUserHistoryQuery()
    const [triggerGetData] = useLazyGetUserHistoryQuery()
    const [gameName, setGameName] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const debouncedValue = useDebounce(gameName, 800)

    return (
        <div className='search'>
            <SearchInput
                onChangeHandler={setGameName}
                onFocusHandler={setIsFocused}
                gameName={gameName}
            />
            <button
                className='search__button'
                onClick={async () => {
                    onClickHandler(gameName)
                    onClickPageReset(1)
                    setGameName('')
                    if (gameName) {
                        await triggerUpdateData({
                            email: email,
                            name: gameName,
                            date: getCurrentDate(),
                        })
                        await triggerGetData({
                            email: email,
                        })
                    }
                }}
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
