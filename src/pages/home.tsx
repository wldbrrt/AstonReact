import { Search } from '../components/search/search'
import { AllGamesList } from '../components/allGamesList/allGamesList'
import { PageControlls } from '../components/allGamesList/pageControlls'
import { useAuthorization } from '../store/hooks'
import { Navigate, useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './home.css'

function Home() {
    const { isAuth } = useAuthorization()
    const [value, setValue] = useSearchParams()
    const [gameName, setGameName] = useState(value.get('search') || '')
    const [pageNumber, setPagenumber] = useState(Number(value.get('page')) || 1)
    const [isLastPage, setIsLastPage] = useState(true)

    useEffect(() => {
        setValue(params => {
            params.set('search', gameName)
            params.set('page', String(pageNumber))
            return params
        })
    }, [gameName, pageNumber])

    return isAuth ? (
        <div className='home'>
            <Search
                onClickHandler={setGameName}
                onClickPageReset={setPagenumber}
            />
            <h1>Search: {gameName}</h1>
            <AllGamesList
                pages={pageNumber}
                size={21}
                name={gameName}
                isLastPageSetter={setIsLastPage}
            />
            <PageControlls
                page={pageNumber}
                onClickHandler={setPagenumber}
                isLastPage={isLastPage}
            />
        </div>
    ) : (
        <Navigate to='/SignIn' />
    )
}

export { Home }
