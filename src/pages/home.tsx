import { Search } from '../components/search/search'
import { AllGamesList } from '../components/allGamesList/allGamesList'
import { PageControlls } from '../components/allGamesList/pageControlls'
import { Theme } from '../App'
import { useGetGamesQuery } from '../api/gamesAPI'
import { useSearchParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import './home.css'

function Home() {
    const [value, setValue] = useSearchParams()
    const [gameName, setGameName] = useState<string>(value.get('search') || '')
    const [pageNumber, setPagenumber] = useState(Number(value.get('page')) || 1)
    const [isLastPage, setIsLastPage] = useState(true)
    const { lightTheme } = useContext(Theme)

    const { data, isLoading, isFetching, isSuccess, isError } =
        useGetGamesQuery({
            pageNumber: Number(value.get('page')) || 1,
            pageSize: 20,
            gameName: value.get('search') || '',
        })

    useEffect(() => {
        setValue(params => {
            params.set('search', gameName)
            params.set('page', String(pageNumber))
            return params
        })
    }, [gameName, pageNumber])

    useEffect(() => {
        setGameName(value.get('search') || '')
        setPagenumber(Number(value.get('page')))
    }, [value])

    return (
        <div className={lightTheme ? 'home' : 'home _black'}>
            <Search
                onClickHandler={setGameName}
                onClickPageReset={setPagenumber}
            />
            <h1 className='home__title'>{gameName ? gameName : 'top games'}</h1>
            {isSuccess && !isError && !!data?.count && (
                <PageControlls
                    page={pageNumber}
                    onClickHandler={setPagenumber}
                    isLastPage={isLastPage}
                    isLoading={isLoading}
                    isFetching={isFetching}
                />
            )}
            <AllGamesList
                isLastPageSetter={setIsLastPage}
                data={data}
                isLoading={isLoading}
                isFetching={isFetching}
                isSuccess={isSuccess}
                isError={isError}
            />
            {isSuccess && !isError && !!data?.count && (
                <PageControlls
                    page={pageNumber}
                    onClickHandler={setPagenumber}
                    isLastPage={isLastPage}
                    isLoading={isLoading}
                    isFetching={isFetching}
                />
            )}
        </div>
    )
}

export { Home as default }
