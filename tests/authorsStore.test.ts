import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useAuthorsStore } from '../app/stores/authors'

describe('useAuthorsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('zwraca autora po identyfikatorze', () => {
    const authorsStore = useAuthorsStore()

    const author = authorsStore.getAuthorById('author-1')

    expect(author?.lastName).toBe('Mickiewicz')
  })

  it('zwraca pełne imię i nazwisko autora', () => {
    const authorsStore = useAuthorsStore()

    const fullName = authorsStore.getAuthorFullName('author-1')

    expect(fullName).toBe('Adam Mickiewicz')
  })

  it('dodaje autora', () => {
    const authorsStore = useAuthorsStore()
    const initialCount = authorsStore.authors.length

    const author = authorsStore.addAuthor({
      firstName: 'Maria',
      lastName: 'Konopnicka',
      biography: 'Polska poetka i nowelistka.'
    })

    expect(authorsStore.authors.length).toBe(initialCount + 1)
    expect(authorsStore.getAuthorById(author.id)?.lastName).toBe('Konopnicka')
  })

  it('edytuje autora', () => {
    const authorsStore = useAuthorsStore()

    authorsStore.updateAuthor('author-1', {
      firstName: 'Adam',
      lastName: 'Mickiewicz-Test',
      biography: 'Zmieniona biografia.'
    })

    const author = authorsStore.getAuthorById('author-1')

    expect(author?.lastName).toBe('Mickiewicz-Test')
    expect(author?.biography).toBe('Zmieniona biografia.')
  })

  it('usuwa autora bez przypisanych książek', () => {
    const authorsStore = useAuthorsStore()

    const author = authorsStore.addAuthor({
      firstName: 'Test',
      lastName: 'Autor'
    })

    const removed = authorsStore.deleteAuthor(author.id)

    expect(removed).toBe(true)
    expect(authorsStore.getAuthorById(author.id)).toBeUndefined()
  })

  it('nie usuwa autora przypisanego do książek', () => {
    const authorsStore = useAuthorsStore()

    const removed = authorsStore.deleteAuthor('author-1')

    expect(removed).toBe(false)
    expect(authorsStore.getAuthorById('author-1')).toBeDefined()
  })
})