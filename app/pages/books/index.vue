<script setup lang="ts">
import BookStatusBadge from '../../components/books/BookStatusBadge.vue'
import { useAuthStore } from '../../stores/auth'
import { useAuthorsStore } from '../../stores/authors'
import { useBooksStore } from '../../stores/books'
import { useCategoriesStore } from '../../stores/categories'

const authStore = useAuthStore()
const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()
const categoriesStore = useCategoriesStore()

const statusFilterItems = [
  { label: 'Wszystkie statusy', value: 'all' },
  { label: 'Dostępne', value: 'available' },
  { label: 'Wypożyczone', value: 'borrowed' }
]

const categoryFilterItems = computed(() => [
  { label: 'Wszystkie kategorie', value: 'all' },
  ...categoriesStore.categories.map((category) => ({
    label: category.name,
    value: category.id
  }))
])

const sortFilterItems = [
  { label: 'Tytuł A-Z', value: 'title-asc' },
  { label: 'Tytuł Z-A', value: 'title-desc' },
  { label: 'Rok rosnąco', value: 'year-asc' },
  { label: 'Rok malejąco', value: 'year-desc' }
]

const deleteSelectedBook = (id: string) => {
  const confirmed = window.confirm('Czy na pewno usunąć tę książkę?')

  if (!confirmed) {
    return
  }

  booksStore.deleteBook(id)
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
          Książki
        </h2>

        <p class="mt-1 text-gray-500 dark:text-gray-400">
          Lista książek dostępnych w katalogu biblioteki.
        </p>
      </div>

      <UButton
        v-if="authStore.isAdmin"
        icon="i-heroicons-plus"
        color="primary"
        to="/books/create"
      >
        Dodaj książkę
      </UButton>
    </div>

    <UCard>
      <div class="grid gap-4 md:grid-cols-4">
        <UInput
          v-model="booksStore.filters.search"
          icon="i-heroicons-magnifying-glass"
          placeholder="Szukaj po tytule lub ISBN"
        />

        <USelect
          v-model="booksStore.filters.status"
          :items="statusFilterItems"
          class="w-full"
        />

        <USelect
          v-model="booksStore.filters.categoryId"
          :items="categoryFilterItems"
          class="w-full"
        />

        <USelect
          v-model="booksStore.filters.sort"
          :items="sortFilterItems"
          class="w-full"
        />
      </div>
    </UCard>

    <UCard>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tytuł
              </th>

              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Autor
              </th>

              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Kategoria
              </th>

              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Rok
              </th>

              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>

              <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                Akcje
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <tr
              v-for="book in booksStore.filteredBooks"
              :key="book.id"
            >
              <td class="px-4 py-4">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ book.title }}
                  </p>

                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    ISBN: {{ book.isbn }}
                  </p>
                </div>
              </td>

              <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                {{ authorsStore.getAuthorFullName(book.authorId) }}
              </td>

              <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                {{ categoriesStore.getCategoryName(book.categoryId) }}
              </td>

              <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                {{ book.publishedYear }}
              </td>

              <td class="px-4 py-4">
                <BookStatusBadge :status="book.status" />
              </td>

              <td class="px-4 py-4">
                <div class="flex justify-end gap-2">
                  <UButton
                    icon="i-heroicons-eye"
                    color="neutral"
                    variant="ghost"
                    :to="`/books/${book.id}`"
                  />

                  <UButton
                    v-if="authStore.isAdmin"
                    icon="i-heroicons-trash"
                    color="error"
                    variant="ghost"
                    @click="deleteSelectedBook(book.id)"
                  />
                </div>
              </td>
            </tr>

            <tr v-if="booksStore.filteredBooks.length === 0">
              <td
                colspan="6"
                class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Brak książek spełniających wybrane kryteria.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>