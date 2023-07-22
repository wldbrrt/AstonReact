import React from 'react'
import './searchInput.css'

interface SearchInputProps {
    onChangeHandler: (gameName: string) => void
    onFocusHandler: (isFocused: boolean) => void
    gameName: string
    onKeyDownEvent: () => void
}

function SearchInput({
    onChangeHandler,
    onFocusHandler,
    gameName,
    onKeyDownEvent,
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
            onBlur={() => setTimeout(() => onFocusHandler(false), 100)}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    onKeyDownEvent()
                }
            }}
        />
    )
}

export { SearchInput }
