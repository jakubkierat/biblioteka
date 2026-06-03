import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCategoriesStore } from '../app/stores/categories'

describe('useCategoriesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('zwraca kategorię po identyfikatorze', () => {
    const categoriesStore = useCategoriesStore()

    const category = categoriesStore.getCategoryById('category-1')

    expect(category?.name).toBe('Literatura piękna')
  })

  it('zwraca nazwę kategorii', () => {
    const categoriesStore = useCategoriesStore()

    const categoryName = categoriesStore.getCategoryName('category-3')

    expect(categoryName).toBe('Science fiction')
  })

  it('dodaje kategorię', () => {
    const categoriesStore = useCategoriesStore()
    const initialCount = categoriesStore.categories.length

    const category = categoriesStore.addCategory({
      name: 'Reportaż',
      description: 'Literatura faktu i reportaże.'
    })

    expect(categoriesStore.categories.length).toBe(initialCount + 1)
    expect(categoriesStore.getCategoryById(category.id)?.name).toBe('Reportaż')
  })

  it('edytuje kategorię', () => {
    const categoriesStore = useCategoriesStore()

    categoriesStore.updateCategory('category-1', {
      name: 'Literatura klasyczna',
      description: 'Klasyka literatury.'
    })

    const category = categoriesStore.getCategoryById('category-1')

    expect(category?.name).toBe('Literatura klasyczna')
    expect(category?.description).toBe('Klasyka literatury.')
  })

  it('usuwa kategorię', () => {
    const categoriesStore = useCategoriesStore()

    categoriesStore.deleteCategory('category-1')

    expect(categoriesStore.getCategoryById('category-1')).toBeUndefined()
  })
})