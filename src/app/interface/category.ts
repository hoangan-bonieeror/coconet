export interface Category {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date
}

export interface CategoryInput {
    name: string
}