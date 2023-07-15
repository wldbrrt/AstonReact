import { useAuthorization } from '../store/hooks'
import { Search } from '../components/search/search'
import { AllGamesList } from '../components/allGamesList/allGamesList'
import { PageControlls } from '../components/allGamesList/pageControlls'
import { Navigate } from 'react-router-dom'
import React, { useState } from 'react'
import './home.css'

function Home() {
    const { isAuth } = useAuthorization()
    const [gameName, setGameName] = useState('')
    const [pageNumber, setPagenumber] = useState(1)
    const [isLastPage, setIsLastPage] = useState(true)

    return isAuth ? (
        <div className='home'>
            <Search
                onClickHandler={setGameName}
                onClickPageReset={setPagenumber}
            />
            <h1>WELCOME</h1>
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
