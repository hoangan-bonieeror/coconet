import { SafeHtml } from "@angular/platform-browser";
import { Category } from "./category"
import { Tag } from "./tag";
import { User } from "./user"

export interface Post {
    id: number,
    title: string,
    content: string,
    categoryId: number,
    authorId: string,
    createdAt: Date,
    updatedAt: Date,
    img_overview: string;
    status: string,
    publishedAt: Date,
    meta_description: string,
    slug: string
}

export interface JoinPost {
    id: number,
    title: string,
    content: SafeHtml,
    status: string
    category: Category,
    user: User,
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    img_overview: string,
    tags: Tag[],
    slug: string,
    meta_description: string
}

export interface PostInput {
    title: string,
    content: string,
    authorId: string,
    categoryId: number,
    tagIds : number[];
}

export interface EditPostInput {
    title: string,
    content: string,
    categoryId: number,
    tagIds : number[];    
}