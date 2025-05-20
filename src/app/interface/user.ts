export interface User {
    id: string,
    username: string,
    createdAt: Date,
    updatedAt: Date
}

export interface UserInput {
    username: string,
    password: string
}

export interface UserLogin {
    username: string,
    password: string
}