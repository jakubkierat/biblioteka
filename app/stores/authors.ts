import { defineStore } from 'pinia'
import { mockAuthors } from '../data/mockLibrary'
import type { Author } from '../types/author'
import { useNotificationsStore } from './notifications'

export interface CreateAuthorPayload {
  firstName: string
  lastName: string
  biography?: string
}

export interface UpdateAuthorPayload {
  firstName: string
  lastName: string
  biography?: string
}

export const useAuthorsStore = defineStore(
  'authors',
  () => {
    const authors = ref<Author[]>([...mockAuthors])

    const loadAuthors = async () => {
      const data = await $fetch<Author[]>('/api/authors')

      authors.value = data
    }

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

    const addAuthor = (payload: CreateAuthorPayload) => {
      const author: Author = {
        id: crypto.randomUUID(),
        firstName: payload.firstName,
        lastName: payload.lastName,
        biography: payload.biography
      }

      authors.value.push(author)

      const notificationsStore = useNotificationsStore()

      notificationsStore.addNotification({
        type: 'success',
        title: 'Dodano autora',
        message: `Dodano autora ${author.firstName} ${author.lastName}.`
      })

      return author
    }

    const updateAuthor = (id: string, payload: UpdateAuthorPayload) => {
      const author = getAuthorById(id)

      if (!author) {
        return
      }

      author.firstName = payload.firstName
      author.lastName = payload.lastName
      author.biography = payload.biography

      const notificationsStore = useNotificationsStore()

      notificationsStore.addNotification({
        type: 'info',
        title: 'Zaktualizowano autora',
        message: `Zaktualizowano autora ${author.firstName} ${author.lastName}.`
      })

      return author
    }

    const deleteAuthor = (id: string) => {
      const author = getAuthorById(id)

      if (!author) {
        return
      }

      const notificationsStore = useNotificationsStore()

      notificationsStore.addNotification({
        type: 'warning',
        title: 'Usunięto autora',
        message: `Usunięto autora ${author.firstName} ${author.lastName}.`
      })

      authors.value = authors.value.filter((item) => item.id !== id)
    }

    return {
      authors,
      loadAuthors,
      getAuthorById,
      getAuthorFullName,
      addAuthor,
      updateAuthor,
      deleteAuthor
    }
  },
  {
    persist: true
  }
)