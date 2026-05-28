import { defineStore } from 'pinia'
import { mockCategories } from '../data/mockLibrary'
import type { Category } from '../types/category'

export interface CreateCategoryPayload {
  name: string
  description?: string
}

export interface UpdateCategoryPayload {
  name: string
  description?: string
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([...mockCategories])

  const getCategoryById = (id: string) => {
    return categories.value.find((category) => category.id === id)
  }

  const loadCategories = async () => {
  const data = await $fetch<Category[]>('/api/categories')

  categories.value = data
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

    return category
  }

  const updateCategory = (id: string, payload: UpdateCategoryPayload) => {
    const category = getCategoryById(id)

    if (!category) {
      return
    }

    category.name = payload.name
    category.description = payload.description

    return category
  }

  const deleteCategory = (id: string) => {
    categories.value = categories.value.filter((category) => category.id !== id)
  }

  return {
    categories,
    loadCategories,
    getCategoryById,
    getCategoryName,
    addCategory,
    updateCategory,
    deleteCategory
  }
})