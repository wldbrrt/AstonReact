import {
    useGetUserHistoryQuery,
    useLazyDeleteUserHistoryQuery,
    useLazyGetUserHistoryQuery,
} from '../../store/slices/firestoreApi'
import { useAuthorization } from '../../store/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React from 'react'
import './historyList.css'

function HistoryList() {
    const [value, setValue] = useSearchParams()
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
                        setValue(params => {
                            params.set('search', `${e.searchReq}`)
                            params.set('page', '1')
                            return params
                        })
                        navigate({
                            pathname: '/',
                            search: `?${value}`,
                        })
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
