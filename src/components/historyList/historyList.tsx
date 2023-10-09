import {
    useGetUserHistoryQuery,
    useLazyDeleteUserHistoryQuery,
    useLazyGetUserHistoryQuery,
} from '../../api/firestoreApi'
import { useAuthorization } from '../../store/hooks'
import { Loader } from '../loader/loader'
import { formatDate } from '../../features/formatDate'
import { IHistory } from '../../types/firestoreApiTypes'
import { getDateFromIsoString } from '../../features/getDateFromIsoString'
import { BackButton } from '../backButton/backButton'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import './historyList.css'

interface IDateObj {
    [key: string]: IHistory[]
}

function HistoryList() {
    const { email } = useAuthorization()
    const { data, isSuccess, isLoading, isFetching, error, isError } =
        useGetUserHistoryQuery({
            email: email,
        })
    const [triggerUpdateHistory] = useLazyGetUserHistoryQuery()
    const navigate = useNavigate()
    const [triggerDeleteHistory] = useLazyDeleteUserHistoryQuery()

    const curDate = formatDate(new Date().toISOString())

    let content
    if (isFetching || isLoading) {
        content = <Loader />
    } else if (isSuccess && !data.history.length) {
        content = 'Nothing was found'
    } else if (isSuccess) {
        const dateObj: IDateObj = {}
        data.history.forEach(e => {
            const dateKey = formatDate(e.date)
            if (dateObj[dateKey]) {
                dateObj[dateKey].push(e)
            } else {
                dateObj[dateKey] = [e]
            }
        })
        content = Object.values(dateObj)
            .reverse()
            .map((e, index) => (
                <div key={e[0].date + index}>
                    <h2>
                        {formatDate(e[0].date) === curDate
                            ? 'Today'
                            : getDateFromIsoString(e[0].date)}
                    </h2>
                    <div className='historyList__wrapper'>
                        {e.reverse().map((e, ind) => (
                            <div
                                key={ind}
                                className='histotyList__item'
                                onClick={() => {
                                    navigate({
                                        pathname: '/',
                                        search: `?search=${e.searchReq}&page=1`,
                                    })
                                }}
                            >
                                <div className='histotyList__name'>
                                    {e.searchReq}
                                </div>
                                <div className='histotyList__date'>
                                    {getDateFromIsoString(e.date, true)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))
    } else if (isError) {
        content = <div>{String(error)}</div>
    }

    return (
        <div className='histotyList'>
            <div className='historyList__actionbar'>
                <button
                    onClick={async () => {
                        await triggerDeleteHistory({ email: email })
                        await triggerUpdateHistory({ email: email })
                    }}
                    className='historyList__button button'
                >
                    Clear history
                </button>
                <div className='historyList__backButton'>
                    <BackButton />
                </div>
            </div>
            <div className='historyList__container'>{content}</div>
        </div>
    )
}

export { HistoryList }
