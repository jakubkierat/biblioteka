import { describe, expect, it } from 'vitest'
import { categorySchema } from '../app/schemas/categorySchema'

describe('categorySchema', () => {
  it('akceptuje poprawną kategorię', () => {
    const result = categorySchema.safeParse({
      name: 'Science fiction',
      description: 'Literatura fantastycznonaukowa.'
    })

    expect(result.success).toBe(true)
  })

  it('odrzuca kategorię bez nazwy', () => {
    const result = categorySchema.safeParse({
      name: '',
      description: 'Literatura fantastycznonaukowa.'
    })

    expect(result.success).toBe(false)
  })
})