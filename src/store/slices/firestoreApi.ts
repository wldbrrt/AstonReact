import { database } from '../../firebase'
import { arrayUnion, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

interface IHistory {
    searchReq: string
    date: string
}

interface IUserData {
    email: string | null
    history: IHistory[]
}

interface IHistoryQueryParams {
    email: string | null
}

interface IupdateHistoryQuery {
    email: string | null
    name: string
    date: string
}

interface IUserUpdatedData {
    isSuccess: boolean
}

export const firestoreApi = createApi({
    baseQuery: fakeBaseQuery(),
    endpoints: builder => ({
        getUserHistory: builder.query<IUserData, IHistoryQueryParams>({
            async queryFn({ email: email }) {
                try {
                    const ref = await getDoc(
                        doc(database, 'Users', `${email}`)
                    ).then(res => {
                        if (res.exists()) {
                            return {
                                history: res.data().history,
                                email: res.data().email,
                            }
                        }
                    })
                    return { data: ref }
                } catch (error: any) {
                    // У меня тут any, но я не придумал чем это заменить и не уверен, что стоит.
                    // Прошу оставить коммент по этому поводу:)
                    return { error: error.message }
                }
            },
        }),
        setUserHistory: builder.query<IUserUpdatedData, IHistoryQueryParams>({
            async queryFn({ email: email }) {
                try {
                    const ref = await setDoc(
                        doc(database, 'Users', `${email}`),
                        {
                            email: email,
                            history: [],
                        }
                    )
                        .then(() => true)
                        .catch(() => false)

                    return { data: { isSuccess: ref } }
                } catch (error: any) {
                    return { error: error.message }
                }
            },
        }),
        updateUserHistory: builder.query<IUserUpdatedData, IupdateHistoryQuery>(
            {
                async queryFn({ email: email, name: name, date: date }) {
                    try {
                        const ref = await updateDoc(
                            doc(database, 'Users', `${email}`),
                            {
                                history: arrayUnion({
                                    searchReq: name,
                                    date: date,
                                }),
                            }
                        )
                            .then(() => true)
                            .catch(() => false)

                        return { data: { isSuccess: ref } }
                    } catch (error: any) {
                        return { error: error.message }
                    }
                },
            }
        ),
    }),
})

export const {
    useGetUserHistoryQuery,
    useSetUserHistoryQuery,
    useLazySetUserHistoryQuery,
    useLazyUpdateUserHistoryQuery,
    useLazyGetUserHistoryQuery,
} = firestoreApi
