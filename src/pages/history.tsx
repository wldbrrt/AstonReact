import { HistoryList } from '../components/historyList/historyList'
import { Navigate } from 'react-router-dom'
import React from 'react'

function History() {
    const isUserSignedIn = localStorage.getItem('isUserSignedIn')

    return isUserSignedIn ? <HistoryList /> : <Navigate to='/SignUp' />
}

export { History }
