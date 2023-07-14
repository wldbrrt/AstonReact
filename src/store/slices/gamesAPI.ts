import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const ApiKey = '2fc817b12e6941de82271c1328e08d20'

interface Igame {
    id: number
    name: string
    background_image: string
    released: string
    rating: number
}
interface ApiResponse {
    count: number
    next: string
    previous: string
    results: Array<Igame>
}

export interface QuerryParams {
    pageNumber: number
    pageSize?: number
    gameName?: string | undefined
}

export const gamesApi = createApi({
    reducerPath: 'gamesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api/' }),
    endpoints: builder => ({
        getGames: builder.query<ApiResponse, QuerryParams>({
            query: ({ pageNumber = 1, pageSize = 1, gameName }) => ({
                url: `games`,
                params: {
                    key: ApiKey,
                    page: pageNumber,
                    page_size: pageSize,
                    search: gameName,
                    search_exact: false,
                    search_precise: true,
                },
            }),
        }),
    }),
})

export const { useGetGamesQuery } = gamesApi
