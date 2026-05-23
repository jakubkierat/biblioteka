import { defineStore } from 'pinia'
import { mockBooks } from '~/data/mockLibrary'
import type { Book, BookStatus } from '~/types/book'

export type BookSortOption = 'title-asc' | 'title-desc' | 'year-asc' | 'year-desc'

export interface BookFilters {
  search: string
  status: BookStatus | 'all'
  categoryId: string
  sort: BookSortOption
}

export const useBooksStore = defineStore('books', () => {
  const books = ref<Book[]>([...mockBooks])

  const filters = ref<BookFilters>({
    search: '',
    status: 'all',
    categoryId: 'all',
    sort: 'title-asc'
  })

  const totalBooks = computed(() => books.value.length)

  const availableBooks = computed(() => {
    return books.value.filter((book) => book.status === 'available')
  })

  const borrowedBooks = computed(() => {
    return books.value.filter((book) => book.status === 'borrowed')
  })

  const filteredBooks = computed(() => {
    const search = filters.value.search.trim().toLowerCase()

    let result = [...books.value]

    if (search) {
      result = result.filter((book) => {
        return book.title.toLowerCase().includes(search) || book.isbn.includes(search)
      })
    }

    if (filters.value.status !== 'all') {
      result = result.filter((book) => book.status === filters.value.status)
    }

    if (filters.value.categoryId !== 'all') {
      result = result.filter((book) => book.categoryId === filters.value.categoryId)
    }

    result.sort((firstBook, secondBook) => {
      if (filters.value.sort === 'title-asc') {
        return firstBook.title.localeCompare(secondBook.title)
      }

      if (filters.value.sort === 'title-desc') {
        return secondBook.title.localeCompare(firstBook.title)
      }

      if (filters.value.sort === 'year-asc') {
        return firstBook.publishedYear - secondBook.publishedYear
      }

      return secondBook.publishedYear - firstBook.publishedYear
    })

    return result
  })

  const getBookById = (id: string) => {
    return books.value.find((book) => book.id === id)
  }

  const deleteBook = (id: string) => {
    books.value = books.value.filter((book) => book.id !== id)
  }

  const setBookStatus = (id: string, status: BookStatus) => {
    const book = getBookById(id)

    if (!book) {
      return
    }

    book.status = status
    book.updatedAt = new Date().toISOString()
  }

  return {
    books,
    filters,
    totalBooks,
    availableBooks,
    borrowedBooks,
    filteredBooks,
    getBookById,
    deleteBook,
    setBookStatus
  }
})