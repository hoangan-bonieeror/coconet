export interface Tag {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date
}

export interface TagInput {
    name: string
}