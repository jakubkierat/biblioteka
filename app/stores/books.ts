import { defineStore } from 'pinia'
import { mockBooks } from '../data/mockLibrary'
import type { Book, BookStatus } from '../types/book'
import { useNotificationsStore } from './notifications'

export type BookSortOption = 'title-asc' | 'title-desc' | 'year-asc' | 'year-desc'

export interface BookFilters {
  search: string
  status: BookStatus | 'all'
  categoryId: string
  sort: BookSortOption
}

export interface CreateBookPayload {
  title: string
  isbn: string
  authorId: string
  categoryId: string
  publishedYear: number
  description: string
  status: BookStatus
}

export interface UpdateBookPayload {
  title: string
  isbn: string
  authorId: string
  categoryId: string
  publishedYear: number
  description: string
  status: BookStatus
}

export const useBooksStore = defineStore(
  'books',
  () => {
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

    const loadBooks = async () => {
      const data = await $fetch<Book[]>('/api/books')

      books.value = data
    }

    const getBookById = (id: string) => {
      return books.value.find((book) => book.id === id)
    }

    const addBook = (payload: CreateBookPayload) => {
      const now = new Date().toISOString()

      const book: Book = {
        id: crypto.randomUUID(),
        title: payload.title,
        isbn: payload.isbn,
        authorId: payload.authorId,
        categoryId: payload.categoryId,
        publishedYear: payload.publishedYear,
        description: payload.description,
        status: payload.status,
        createdAt: now,
        updatedAt: now
      }

      books.value.unshift(book)

      const notificationsStore = useNotificationsStore()

      notificationsStore.addNotification({
        type: 'success',
        title: 'Dodano książkę',
        message: `Dodano książkę "${book.title}".`
      })

      return book
    }

    const updateBook = (id: string, payload: UpdateBookPayload) => {
      const book = getBookById(id)

      if (!book) {
        return
      }

      book.title = payload.title
      book.isbn = payload.isbn
      book.authorId = payload.authorId
      book.categoryId = payload.categoryId
      book.publishedYear = payload.publishedYear
      book.description = payload.description
      book.status = payload.status
      book.updatedAt = new Date().toISOString()

      const notificationsStore = useNotificationsStore()

      notificationsStore.addNotification({
        type: 'info',
        title: 'Zaktualizowano książkę',
        message: `Zaktualizowano książkę "${book.title}".`
      })

      return book
    }

    const deleteBook = (id: string) => {
      const book = getBookById(id)

      if (!book) {
        return
      }

      const notificationsStore = useNotificationsStore()

      notificationsStore.addNotification({
        type: 'warning',
        title: 'Usunięto książkę',
        message: `Usunięto książkę "${book.title}".`
      })

      books.value = books.value.filter((item) => item.id !== id)
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
      loadBooks,
      getBookById,
      addBook,
      updateBook,
      deleteBook,
      setBookStatus
    }
  },
  {
    persist: true
  }
)