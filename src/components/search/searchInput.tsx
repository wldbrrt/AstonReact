import React from 'react'
import './searchInput.css'

interface SearchInputProps {
    onChangeHandler: (gameName: string) => void
    onFocusHandler: (isFocused: boolean) => void
    gameName: string
}

function SearchInput({
    onChangeHandler,
    onFocusHandler,
    gameName,
}: SearchInputProps) {
    return (
        <input
            className='search__input'
            type='text'
            placeholder='Enter game name'
            name='search'
            value={gameName}
            onChange={e => onChangeHandler(e.target.value)}
            onFocus={() => onFocusHandler(true)}
            onBlur={() => onFocusHandler(false)}
        />
    )
}

export { SearchInput }
