<script setup lang="ts">
import CategoryForm from '../../components/categories/CategoryForm.vue'
import type { CategorySchema } from '../../schemas/categorySchema'
import { useBooksStore } from '../../stores/books'
import { useCategoriesStore } from '../../stores/categories'
import type { Category } from '../../types/category'

definePageMeta({
  middleware: 'role',
  roles: ['admin']
})

const categoriesStore = useCategoriesStore()
const booksStore = useBooksStore()

const isFormOpen = ref(false)
const editedCategoryId = ref<string | null>(null)

const editedCategory = computed(() => {
  if (!editedCategoryId.value) {
    return undefined
  }

  return categoriesStore.getCategoryById(editedCategoryId.value)
})

const editedCategoryInitialValues = computed<CategorySchema | undefined>(() => {
  if (!editedCategory.value) {
    return undefined
  }

  return {
    name: editedCategory.value.name,
    description: editedCategory.value.description ?? ''
  }
})

const getCategoryBooksCount = (categoryId: string) => {
  return booksStore.books.filter((book) => book.categoryId === categoryId).length
}

const openCreateForm = () => {
  editedCategoryId.value = null
  isFormOpen.value = true
}

const openEditForm = (category: Category) => {
  editedCategoryId.value = category.id
  isFormOpen.value = true
}

const closeForm = () => {
  editedCategoryId.value = null
  isFormOpen.value = false
}

const saveCategory = (data: CategorySchema) => {
  if (editedCategoryId.value) {
    categoriesStore.updateCategory(editedCategoryId.value, {
      name: data.name,
      description: data.description
    })

    closeForm()
    return
  }

  categoriesStore.addCategory({
    name: data.name,
    description: data.description
  })

  closeForm()
}

const deleteCategory = (category: Category) => {
  const booksCount = getCategoryBooksCount(category.id)

  if (booksCount > 0) {
    window.alert('Nie można usunąć kategorii przypisanej do książek.')
    return
  }

  const confirmed = window.confirm('Czy na pewno usunąć tę kategorię?')

  if (!confirmed) {
    return
  }

  categoriesStore.deleteCategory(category.id)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <UButton
          icon="i-heroicons-arrow-left"
          color="neutral"
          variant="ghost"
          to="/"
          class="mb-4"
        >
          Wróć do panelu głównego
        </UButton>

        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Kategorie
        </h2>

        <p class="mt-1 text-gray-500 dark:text-gray-400">
          Zarządzanie kategoriami książek.
        </p>
      </div>

      <UButton
        icon="i-heroicons-plus"
        color="primary"
        @click="openCreateForm"
      >
        Dodaj kategorię
      </UButton>
    </div>

    <UCard v-if="isFormOpen">
      <template #header>
        <h3 class="text-lg font-semibold">
          {{ editedCategoryId ? 'Edycja kategorii' : 'Dodaj kategorię' }}
        </h3>
      </template>

      <CategoryForm
        :initial-values="editedCategoryInitialValues"
        :submit-label="editedCategoryId ? 'Zapisz zmiany' : 'Zapisz kategorię'"
        @submit="saveCategory"
        @cancel="closeForm"
      />
    </UCard>

    <UCard>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Kategoria
              </th>

              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Opis
              </th>

              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Liczba książek
              </th>

              <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                Akcje
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="category in categoriesStore.categories"
              :key="category.id"
            >
              <td class="px-4 py-4">
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ category.name }}
                </p>
              </td>

              <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                {{ category.description || 'Brak opisu' }}
              </td>

              <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                {{ getCategoryBooksCount(category.id) }}
              </td>

              <td class="px-4 py-4">
                <div class="flex justify-end gap-2">
                  <UButton
                    icon="i-heroicons-pencil-square"
                    color="neutral"
                    variant="ghost"
                    @click="openEditForm(category)"
                  />

                  <UButton
                    icon="i-heroicons-trash"
                    color="error"
                    variant="ghost"
                    @click="deleteCategory(category)"
                  />
                </div>
              </td>
            </tr>

            <tr v-if="categoriesStore.categories.length === 0">
              <td
                colspan="4"
                class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Brak kategorii w katalogu.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>