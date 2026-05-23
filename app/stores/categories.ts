import { defineStore } from 'pinia'
import { mockCategories } from '~/data/mockLibrary'
import type { Category } from '~/types/category'

export const useCategoriesStore = defineStore('categories', () => {
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

  return {
    categories,
    getCategoryById,
    getCategoryName
  }
})