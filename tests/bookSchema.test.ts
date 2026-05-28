import { describe, expect, it } from 'vitest'
import { bookSchema } from '../app/schemas/bookSchema'

describe('bookSchema', () => {
  it('akceptuje poprawne dane książki', () => {
    const result = bookSchema.safeParse({
      title: 'Pan Tadeusz',
      isbn: '9788373271890',
      authorId: 'author-1',
      categoryId: 'category-2',
      publishedYear: 1834,
      description: 'Epopeja narodowa.',
      status: 'available'
    })

    expect(result.success).toBe(true)
  })

  it('odrzuca pusty tytuł książki', () => {
    const result = bookSchema.safeParse({
      title: '',
      isbn: '9788373271890',
      authorId: 'author-1',
      categoryId: 'category-2',
      publishedYear: 1834,
      description: 'Epopeja narodowa.',
      status: 'available'
    })

    expect(result.success).toBe(false)
  })

  it('odrzuca rok wydania z przyszłości', () => {
    const result = bookSchema.safeParse({
      title: 'Przyszła książka',
      isbn: '9788373271890',
      authorId: 'author-1',
      categoryId: 'category-2',
      publishedYear: new Date().getFullYear() + 1,
      description: 'Opis książki.',
      status: 'available'
    })

    expect(result.success).toBe(false)
  })
})