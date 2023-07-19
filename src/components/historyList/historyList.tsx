import { useGetUserHistoryQuery } from '../../store/slices/firestoreApi'
import { useAuthorization } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import './historyList.css'

function HistoryList() {
    const { email } = useAuthorization()
    const { data, isSuccess, isLoading, isFetching, error, isError } =
        useGetUserHistoryQuery({
            email: email,
        })
    const navigate = useNavigate()

    if (isSuccess) console.log(data)
    let content
    if (isFetching || isLoading) {
        content = 'is Loading'
    } else if (isSuccess && !data.history.length) {
        content = 'Nothing was found'
    } else if (isSuccess) {
        content = data.history.map((e, index) => (
            <div
                key={index}
                className='histotyList__item'
                onClick={() => {
                    if (e.searchReq) {
                        localStorage.setItem('gameName', e.searchReq)
                        localStorage.setItem('pageNumber', '1')
                        navigate('/')
                    }
                }}
            >
                <div className='histotyList__name'>{e.searchReq}</div>
                <div className='histotyList__date'>{e.date}</div>
            </div>
        ))
    } else if (isError) {
        content = <div>{String(error)}</div>
    }

    return (
        <div className='histotyList'>
            <button className='historyList__button'>Clear history</button>
            <div className='historyList__container'>{content}</div>
        </div>
    )
}

export { HistoryList }
