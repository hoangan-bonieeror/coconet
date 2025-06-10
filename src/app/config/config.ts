export enum SORT_ORDER {
    ASCENDING = "A to Z",
    DESCENDING = "Z to A"
}

export enum LOCALSTORAGE_KEY {
    TOKEN = "token",
    USER = "user"
}

export enum SESSION_STORAGE_KEY {
    CURRENT_PAGE = "current_page"
}

export const GG_MAP_API_KEY = "AIzaSyAzqeQhH4T80xqzZkv2gQbn3mz-toqaWgU"

export enum POST_STATUS {
    DRAFT = "Draft",
    PUBLISH = "Publish"
}

export const POST_STATUS_MAP = {
    [POST_STATUS.DRAFT]: "Bản nháp",
    [POST_STATUS.PUBLISH]: "Đã xuất bản" 
}