import { z } from 'zod'

export const authorSchema = z.object({
  firstName: z.string().min(1, 'Imię jest wymagane').max(80, 'Imię może mieć maksymalnie 80 znaków'),
  lastName: z.string().min(1, 'Nazwisko jest wymagane').max(100, 'Nazwisko może mieć maksymalnie 100 znaków'),
  biography: z.string().max(1000, 'Biografia może mieć maksymalnie 1000 znaków').optional()
})

export type AuthorSchema = z.output<typeof authorSchema>