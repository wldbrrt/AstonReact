import { database } from '../../firebase'
import {
    arrayUnion,
    doc,
    updateDoc,
    getDoc,
    setDoc,
    deleteField,
} from 'firebase/firestore'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

interface IHistory {
    searchReq: string
    date: string
}

interface IUserData {
    email: string | null
    history: IHistory[]
}

interface IUserNestedObj {
    name: string
    background_image: string
    date: string
    id: number
}

interface IUserFavorites {
    [id: string]: IUserNestedObj
}

interface IUserFavoritesProps {
    email: string | null
    id: string
    name: string
    date: string
    background_image: string
}

interface IUserDelParams {
    email: string | null
    id: string
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
                } catch (error: unknown) {
                    return { error: error }
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
                            favorites: {},
                        }
                    )
                        .then(() => true)
                        .catch(() => false)

                    return { data: { isSuccess: ref } }
                } catch (error: unknown) {
                    return { error: error }
                }
            },
        }),
        deleteUserHistory: builder.query<IUserUpdatedData, IHistoryQueryParams>(
            {
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
                    } catch (error: unknown) {
                        return { error: error }
                    }
                },
            }
        ),
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
                    } catch (error: unknown) {
                        return { error: error }
                    }
                },
            }
        ),
        getUserFavorites: builder.query<IUserFavorites, IHistoryQueryParams>({
            async queryFn({ email: email }) {
                try {
                    const ref = await getDoc(
                        doc(database, 'Users', `${email}`)
                    ).then(res => {
                        if (res.exists()) {
                            return {
                                ...res.data().favorites,
                            }
                        }
                    })
                    return { data: ref }
                } catch (error: unknown) {
                    return { error: error }
                }
            },
        }),
        updateUserFavorites: builder.query<
            IUserUpdatedData,
            IUserFavoritesProps
        >({
            async queryFn({
                email: email,
                name: name,
                date: date,
                background_image: background_image,
                id: id,
            }) {
                try {
                    const ref = await updateDoc(
                        doc(database, 'Users', `${email}`),
                        {
                            [`favorites.${[id]}`]: {
                                email: email,
                                name: name,
                                date: date,
                                background_image: background_image,
                                id: id,
                            },
                        }
                    )
                        .then(() => true)
                        .catch(() => false)

                    return { data: { isSuccess: ref } }
                } catch (error: unknown) {
                    return { error: error }
                }
            },
        }),
        deleteUserFavorites: builder.query<IUserUpdatedData, IUserDelParams>({
            async queryFn({ email: email, id: id }) {
                try {
                    const ref = await updateDoc(
                        doc(database, 'Users', `${email}`),
                        {
                            [`favorites.${[id]}`]: deleteField(),
                        }
                    )
                        .then(() => true)
                        .catch(() => false)

                    return { data: { isSuccess: ref } }
                } catch (error: unknown) {
                    return { error: error }
                }
            },
        }),
    }),
})

export const {
    useGetUserHistoryQuery,
    useSetUserHistoryQuery,
    useLazySetUserHistoryQuery,
    useLazyUpdateUserHistoryQuery,
    useLazyGetUserHistoryQuery,
    useGetUserFavoritesQuery,
    useLazyGetUserFavoritesQuery,
    useUpdateUserFavoritesQuery,
    useLazyUpdateUserFavoritesQuery,
    useDeleteUserFavoritesQuery,
    useLazyDeleteUserFavoritesQuery,
    useLazyDeleteUserHistoryQuery,
} = firestoreApi
