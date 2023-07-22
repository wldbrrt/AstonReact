import {
    ApiResponse,
    GetGamesQuery,
    GetSingleGameQuery,
    Igame,
} from '../../types/gamesApiTypes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const ApiKey = '2fc817b12e6941de82271c1328e08d20'

export const gamesApi = createApi({
    reducerPath: 'gamesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api/' }),
    endpoints: builder => ({
        getGames: builder.query<ApiResponse, GetGamesQuery>({
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
        getSingleGame: builder.query<Igame, GetSingleGameQuery>({
            query: ({ gameId }) => ({
                url: `games/${gameId}`,
                params: {
                    key: ApiKey,
                },
            }),
            transformResponse: (responce: Igame) => {
                return {
                    id: responce.id,
                    name: responce.name,
                    background_image: responce.background_image,
                    released: responce.released,
                    rating: responce.rating,
                    description_raw: responce.description_raw,
                }
            },
        }),
    }),
})

export const { useGetGamesQuery, useGetSingleGameQuery } = gamesApi
