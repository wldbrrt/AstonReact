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
                <svg
                    className='search__icon'
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    viewBox='0 0 30 30'
                    fill='none'
                >
                    <path
                        d='M29.6093 27.724L21.6243 19.7387C23.3516 17.591 24.2916 14.9413 24.2916 12.1457C24.2916 8.90133 23.0283 5.85133 20.7339 3.557C18.4399 1.26333 15.3903 0 12.146 0C8.90164 0 5.85165 1.26333 3.55732 3.55733C1.26333 5.85133 0 8.90167 0 12.146C0 15.3903 1.26333 18.4403 3.55732 20.7343C5.85132 23.0287 8.90164 24.292 12.146 24.292C14.9416 24.292 17.5913 23.352 19.7389 21.6247L27.7239 29.6097C27.9839 29.8697 28.3256 30 28.6666 30C29.0076 30 29.3493 29.8697 29.6093 29.6093C30.1302 29.089 30.1302 28.2443 29.6093 27.724ZM5.44298 18.8487C3.65266 17.0583 2.66666 14.678 2.66666 12.146C2.66666 9.614 3.65266 7.23367 5.44298 5.44333C7.23331 3.653 9.61397 2.66667 12.146 2.66667C14.678 2.66667 17.0583 3.65267 18.8486 5.443C20.6389 7.23333 21.6249 9.614 21.6249 12.1457C21.6249 14.6777 20.6389 17.058 18.8486 18.8483C17.0583 20.6387 14.678 21.6247 12.146 21.6247C9.61397 21.625 7.23331 20.639 5.44298 18.8487Z'
                        fillOpacity='0.7'
                    />
                </svg>
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
