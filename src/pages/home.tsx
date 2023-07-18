import { Search } from '../components/search/search'
import { AllGamesList } from '../components/allGamesList/allGamesList'
import { PageControlls } from '../components/allGamesList/pageControlls'
import { Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './home.css'

function Home() {
    const isUserSignedIn = localStorage.getItem('isUserSignedIn')

    const storageName = localStorage.getItem('gameName')
        ? String(localStorage.getItem('gameName'))
        : ''
    const storagePage = localStorage.getItem('pageNumber')
        ? Number(localStorage.getItem('pageNumber'))
        : 1

    const [gameName, setGameName] = useState(storageName)
    const [pageNumber, setPagenumber] = useState(storagePage)
    const [isLastPage, setIsLastPage] = useState(true)

    useEffect(() => {
        localStorage.setItem('gameName', gameName)
        localStorage.setItem('pageNumber', String(pageNumber))
    }, [gameName, pageNumber])

    return isUserSignedIn ? (
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
