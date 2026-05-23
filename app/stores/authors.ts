import { defineStore } from 'pinia'
import { mockAuthors } from '~/data/mockLibrary'
import type { Author } from '~/types/author'

export const useAuthorsStore = defineStore('authors', () => {
  const authors = ref<Author[]>([...mockAuthors])

  const getAuthorById = (id: string) => {
    return authors.value.find((author) => author.id === id)
  }

  const getAuthorFullName = (id: string) => {
    const author = getAuthorById(id)

    if (!author) {
      return 'Nieznany autor'
    }

    return `${author.firstName} ${author.lastName}`
  }

  return {
    authors,
    getAuthorById,
    getAuthorFullName
  }
})