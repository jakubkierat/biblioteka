import { z } from 'zod'

export const bookSchema = z.object({
  title: z.string().min(1, 'Tytuł jest wymagany').max(120, 'Tytuł może mieć maksymalnie 120 znaków'),
  isbn: z.string().min(10, 'ISBN musi mieć co najmniej 10 znaków').max(17, 'ISBN może mieć maksymalnie 17 znaków'),
  authorId: z.string().min(1, 'Autor jest wymagany'),
  categoryId: z.string().min(1, 'Kategoria jest wymagana'),
  publishedYear: z.coerce
    .number({
      message: 'Rok wydania musi być liczbą'
    })
    .int('Rok wydania musi być liczbą całkowitą')
    .min(1000, 'Rok wydania musi być większy lub równy 1000')
    .max(new Date().getFullYear(), 'Rok wydania nie może być z przyszłości'),
  description: z.string().min(1, 'Opis jest wymagany').max(1000, 'Opis może mieć maksymalnie 1000 znaków'),
  status: z.enum(['available', 'borrowed'])
})

export type BookSchema = z.output<typeof bookSchema>