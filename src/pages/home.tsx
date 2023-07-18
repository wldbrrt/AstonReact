import { useAppDispatch } from '../store/hooks'
import { Search } from '../components/search/search'
import { AllGamesList } from '../components/allGamesList/allGamesList'
import { PageControlls } from '../components/allGamesList/pageControlls'
import { setUser } from '../store/slices/user'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import './home.css'

function Home() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
        const auth = getAuth()
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                    })
                )

                navigate(`/`)
            } else {
                navigate('/SignIn')
            }
        })
        localStorage.setItem('gameName', gameName)
        localStorage.setItem('pageNumber', String(pageNumber))
    }, [gameName, pageNumber])

    return (
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
    )
}

export { Home }
