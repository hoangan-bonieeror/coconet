import { Category } from "./category"
import { User } from "./user"

export interface Post {
    id: number,
    title: string,
    content: string,
    categoryId: number,
    authorId: string,
    createdAt: Date,
    updatedAt: Date
}

export interface JoinPost {
    id: number,
    title: string,
    content: string,
    category: Category,
    user: User,
    createdAt: Date,
    updatedAt: Date
}

export interface PostInput {
    title: string,
    content: string,
    authorId: string,
    categoryId: number
}