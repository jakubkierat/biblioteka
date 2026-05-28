import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Nazwa kategorii jest wymagana').max(100, 'Nazwa może mieć maksymalnie 100 znaków'),
  description: z.string().max(1000, 'Opis może mieć maksymalnie 1000 znaków').optional()
})

export type CategorySchema = z.output<typeof categorySchema>