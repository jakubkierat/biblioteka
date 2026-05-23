export type BookStatus = 'available' | 'borrowed'

export interface Book {
  id: string
  title: string
  isbn: string
  authorId: string
  categoryId: string
  publishedYear: number
  description: string
  status: BookStatus
  createdAt: string
  updatedAt: string
}