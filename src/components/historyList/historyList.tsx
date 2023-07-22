import {
    useGetUserHistoryQuery,
    useLazyDeleteUserHistoryQuery,
    useLazyGetUserHistoryQuery,
} from '../../api/firestoreApi'
import { useAuthorization } from '../../store/hooks'
import { Loader } from '../loader/loader'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import './historyList.css'

function HistoryList() {
    const { email } = useAuthorization()
    const { data, isSuccess, isLoading, isFetching, error, isError } =
        useGetUserHistoryQuery({
            email: email,
        })
    const [triggerUpdateHistory] = useLazyGetUserHistoryQuery()
    const navigate = useNavigate()
    const [triggerDeleteHistory] = useLazyDeleteUserHistoryQuery()

    let content
    if (isFetching || isLoading) {
        content = <Loader />
    } else if (isSuccess && !data.history.length) {
        content = 'Nothing was found'
    } else if (isSuccess) {
        content = data.history.map((e, index) => (
            <div
                key={index}
                className='histotyList__item'
                onClick={() => {
                    navigate({
                        pathname: '/',
                        search: `?search=${e.searchReq}&page=1`,
                    })
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
            <button
                onClick={async () => {
                    await triggerDeleteHistory({ email: email })
                    await triggerUpdateHistory({ email: email })
                }}
                className='historyList__button'
            >
                Clear history
            </button>
            <div className='historyList__container'>{content}</div>
        </div>
    )
}

export { HistoryList }
