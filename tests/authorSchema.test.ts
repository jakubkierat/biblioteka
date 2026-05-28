import { describe, expect, it } from 'vitest'
import { authorSchema } from '../app/schemas/authorSchema'

describe('authorSchema', () => {
  it('akceptuje poprawne dane autora', () => {
    const result = authorSchema.safeParse({
      firstName: 'Adam',
      lastName: 'Mickiewicz',
      biography: 'Polski poeta romantyczny.'
    })

    expect(result.success).toBe(true)
  })

  it('odrzuca autora bez imienia', () => {
    const result = authorSchema.safeParse({
      firstName: '',
      lastName: 'Mickiewicz',
      biography: 'Polski poeta romantyczny.'
    })

    expect(result.success).toBe(false)
  })

  it('odrzuca autora bez nazwiska', () => {
    const result = authorSchema.safeParse({
      firstName: 'Adam',
      lastName: '',
      biography: 'Polski poeta romantyczny.'
    })

    expect(result.success).toBe(false)
  })
})