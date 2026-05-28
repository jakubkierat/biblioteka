import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useBooksStore } from '../app/stores/books'

describe('useBooksStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('zwraca książkę po identyfikatorze', () => {
    const booksStore = useBooksStore()

    const book = booksStore.getBookById('book-1')

    expect(book?.title).toBe('Pan Tadeusz')
  })

  it('dodaje nową książkę', () => {
    const booksStore = useBooksStore()
    const initialCount = booksStore.books.length

    const book = booksStore.addBook({
      title: 'Nowa książka',
      isbn: '9780000000000',
      authorId: 'author-1',
      categoryId: 'category-1',
      publishedYear: 2024,
      description: 'Opis nowej książki.',
      status: 'available'
    })

    expect(booksStore.books.length).toBe(initialCount + 1)
    expect(booksStore.getBookById(book.id)?.title).toBe('Nowa książka')
  })

  it('zmienia status książki', () => {
    const booksStore = useBooksStore()

    booksStore.setBookStatus('book-1', 'borrowed')

    expect(booksStore.getBookById('book-1')?.status).toBe('borrowed')
  })

  it('usuwa książkę', () => {
    const booksStore = useBooksStore()

    booksStore.deleteBook('book-1')

    expect(booksStore.getBookById('book-1')).toBeUndefined()
  })
})