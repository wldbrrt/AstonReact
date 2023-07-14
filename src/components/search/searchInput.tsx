import React from "react";
import './searchInput.css';

interface SearchInputProps {
    onChangeHandler: (gameName: string) => void
}

function SearchInput({ onChangeHandler }: SearchInputProps) {

    return (
        <input
            type="text"
            placeholder="Enter game name"
            name="search"
            onChange={(e) => onChangeHandler(e.target.value)}
        />
    )
}

export { SearchInput };