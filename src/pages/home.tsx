import { Search } from '../components/search/search'
import { AllGamesList } from '../components/allGamesList/allGamesList'
import { PageControlls } from '../components/allGamesList/pageControlls'
import { useAuthorization } from '../store/hooks'
import { Theme } from '../App'
import { Navigate, useSearchParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import './home.css'

function Home() {
    const { isAuth } = useAuthorization()
    const [value, setValue] = useSearchParams()
    const [gameName, setGameName] = useState('')
    const [pageNumber, setPagenumber] = useState(1)
    const [isLastPage, setIsLastPage] = useState(true)
    const { lightTheme } = useContext(Theme)
    useEffect(() => {
        setValue(params => {
            params.set('search', gameName)
            params.set('page', String(pageNumber))
            return params
        })
    }, [gameName, pageNumber])

    useEffect(() => {
        setGameName(value.get('search') || '')
        setPagenumber(Number(value.get('page')) || 1)
    }, [value])

    return isAuth ? (
        <div className={lightTheme ? 'home' : 'home _black'}>
            <Search
                onClickHandler={setGameName}
                onClickPageReset={setPagenumber}
            />
            <h1>Search: {gameName}</h1>
            <AllGamesList
                size={21}
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

export { Home as default }
