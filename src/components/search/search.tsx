import { SearchInput } from "./searchInput";
import { GameList } from "./gameList";
import { useDebounce } from "../../store/hooks";
import React, { useState } from "react";
import './search.css';


function Search() {
    const [gameName, setGameName] = useState('');
    const debouncedValue = useDebounce(gameName, 800)

    return (
        <div>
            <SearchInput onChangeHandler={setGameName} />
            <button >
                Search
            </button>
            <GameList pages={1} size={5} name={debouncedValue} />
        </div>
    )
}
export { Search };