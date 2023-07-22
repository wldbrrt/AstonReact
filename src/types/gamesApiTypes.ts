export interface Igame {
    id: number
    name: string
    background_image: string
    released: string
    rating: number
    description_raw: string
}
export interface ApiResponse {
    count: number
    next: string
    previous: string
    results: Array<Igame>
}

export interface GetGamesQuery {
    pageNumber: number
    pageSize?: number
    gameName?: string | undefined
}

export interface GetSingleGameQuery {
    gameId: number
}
