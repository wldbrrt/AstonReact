import React from 'react'
import './searchInput.css'

interface SearchInputProps {
    onChangeHandler: (gameName: string) => void
    onFocusHandler: (isFocused: boolean) => void
}

function SearchInput({ onChangeHandler, onFocusHandler }: SearchInputProps) {
    return (
        <input
            className='search__input'
            type='text'
            placeholder='Enter game name'
            name='search'
            onChange={e => onChangeHandler(e.target.value)}
            onFocus={() => onFocusHandler(true)}
            onBlur={() => onFocusHandler(false)}
        />
    )
}

export { SearchInput }
