import { defineStore } from 'pinia'
import { mockCategories } from '../data/mockLibrary'
import type { Category } from '../types/category'
import { useBooksStore } from './books'
import { useNotificationsStore } from './notifications'

export interface CreateCategoryPayload {
  name: string
  description?: string
}

export type UpdateCategoryPayload = CreateCategoryPayload

export const useCategoriesStore = defineStore(
  'categories',
  () => {
    const categories = ref<Category[]>([...mockCategories])

    const getCategoryById = (id: string) => {
      return categories.value.find((category) => category.id === id)
    }

    const getCategoryName = (id: string) => {
      const category = getCategoryById(id)

      if (!category) {
        return 'Brak kategorii'
      }

      return category.name
    }

    const addCategory = (payload: CreateCategoryPayload) => {
      const category: Category = {
        id: crypto.randomUUID(),
        name: payload.name,
        description: payload.description
      }

      categories.value.push(category)

      const notificationsStore = useNotificationsStore()

      notificationsStore.addNotification({
        type: 'success',
        title: 'Dodano kategorię',
        message: `Dodano kategorię "${category.name}".`
      })

      return category
    }

    const updateCategory = (id: string, payload: UpdateCategoryPayload) => {
      const category = getCategoryById(id)

      if (!category) {
        return
      }

      category.name = payload.name
      category.description = payload.description

      const notificationsStore = useNotificationsStore()

      notificationsStore.addNotification({
        type: 'info',
        title: 'Zaktualizowano kategorię',
        message: `Zaktualizowano kategorię "${category.name}".`
      })

      return category
    }

    const deleteCategory = (id: string) => {
      const category = getCategoryById(id)

      if (!category) {
        return false
      }

      const notificationsStore = useNotificationsStore()
      const booksStore = useBooksStore()

      const hasBooks = booksStore.books.some((book) => book.categoryId === id)

      if (hasBooks) {
        notificationsStore.addNotification({
          type: 'error',
          title: 'Nie można usunąć kategorii',
          message: `Kategoria "${category.name}" ma przypisane książki w katalogu.`
        })

        return false
      }

      notificationsStore.addNotification({
        type: 'warning',
        title: 'Usunięto kategorię',
        message: `Usunięto kategorię "${category.name}".`
      })

      categories.value = categories.value.filter((item) => item.id !== id)

      return true
    }

    return {
      categories,
      getCategoryById,
      getCategoryName,
      addCategory,
      updateCategory,
      deleteCategory
    }
  },
  {
    persist: true
  }
)