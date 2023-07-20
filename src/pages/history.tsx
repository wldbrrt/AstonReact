import { HistoryList } from '../components/historyList/historyList'
import { useAuthorization } from '../store/hooks'
import { Navigate } from 'react-router-dom'
import React from 'react'

function History() {
    const { isAuth } = useAuthorization()

    return isAuth ? <HistoryList /> : <Navigate to='/SignUp' />
}

export { History }
