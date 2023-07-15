import { SearchInput } from './searchInput'
import { GameList } from './gameList'
import { useDebounce } from '../../store/hooks'
import React, { useState } from 'react'
import './search.css'

interface SearchProps {
    onClickHandler: (gameName: string) => void
    onClickPageReset: (pageNumber: number) => void
}

function Search({ onClickHandler, onClickPageReset }: SearchProps) {
    const [gameName, setGameName] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const debouncedValue = useDebounce(gameName, 800)

    return (
        <div className='search'>
            <SearchInput
                onChangeHandler={setGameName}
                onFocusHandler={setIsFocused}
            />
            <button
                className='search__button'
                onClick={() => {
                    onClickHandler(debouncedValue)
                    onClickPageReset(1)
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
