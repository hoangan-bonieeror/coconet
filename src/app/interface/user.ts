export interface User {
    id: string,
    username: string,
    createdAt: Date,
    updatedAt: Date
}

export interface UserInput {
    id: string,
    username: string,
    password: string
}

export interface UserLogin {
    username: string,
    password: string
}