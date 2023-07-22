export interface IHistory {
    searchReq: string
    date: string
}

export interface IUserData {
    email: string | null
    history: IHistory[]
}

export interface IUserNestedObj {
    name: string
    background_image: string
    date: string
    id: number
}

export interface IUserFavorites {
    [id: string]: IUserNestedObj
}

export interface IUserFavoritesProps {
    email: string | null
    id: string
    name: string
    date: string
    background_image: string
}

export interface IUserDelParams {
    email: string | null
    id: string
}

export interface IHistoryQueryParams {
    email: string | null
}

export interface IupdateHistoryQuery {
    email: string | null
    name: string
    date: string
}

export interface IUserUpdatedData {
    isSuccess: boolean
}
