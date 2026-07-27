<script setup lang="ts">
import AuthorForm from '../../components/authors/AuthorForm.vue'
import type { AuthorSchema } from '../../schemas/authorSchema'
import { useAuthorsStore } from '../../stores/authors'
import { useBooksStore } from '../../stores/books'
import type { Author } from '../../types/author'

definePageMeta({
  middleware: 'role',
  roles: ['admin']
})

const authorsStore = useAuthorsStore()
const booksStore = useBooksStore()

const isFormOpen = ref(false)
const editedAuthorId = ref<string | null>(null)

const editedAuthor = computed(() => {
  if (!editedAuthorId.value) {
    return undefined
  }

  return authorsStore.getAuthorById(editedAuthorId.value)
})

const editedAuthorInitialValues = computed<AuthorSchema | undefined>(() => {
  if (!editedAuthor.value) {
    return undefined
  }

  return {
    firstName: editedAuthor.value.firstName,
    lastName: editedAuthor.value.lastName,
    biography: editedAuthor.value.biography ?? ''
  }
})

const getAuthorBooksCount = (authorId: string) => {
  return booksStore.books.filter((book) => book.authorId === authorId).length
}

const openCreateForm = () => {
  editedAuthorId.value = null
  isFormOpen.value = true
}

const openEditForm = (author: Author) => {
  editedAuthorId.value = author.id
  isFormOpen.value = true
}

const closeForm = () => {
  editedAuthorId.value = null
  isFormOpen.value = false
}

const saveAuthor = (data: AuthorSchema) => {
  if (editedAuthorId.value) {
    authorsStore.updateAuthor(editedAuthorId.value, {
      firstName: data.firstName,
      lastName: data.lastName,
      biography: data.biography
    })

    closeForm()
    return
  }

  authorsStore.addAuthor({
    firstName: data.firstName,
    lastName: data.lastName,
    biography: data.biography
  })

  closeForm()
}

const deleteAuthor = (author: Author) => {
  const confirmed = window.confirm('Czy na pewno usunąć tego autora?')

  if (!confirmed) {
    return
  }

  authorsStore.deleteAuthor(author.id)
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
          Autorzy
        </h2>

        <p class="mt-1 text-gray-500 dark:text-gray-400">
          Zarządzanie autorami książek.
        </p>
      </div>

      <UButton
        icon="i-heroicons-plus"
        color="primary"
        @click="openCreateForm"
      >
        Dodaj autora
      </UButton>
    </div>

    <UCard v-if="isFormOpen">
      <template #header>
        <h3 class="text-lg font-semibold">
          {{ editedAuthorId ? 'Edycja autora' : 'Dodaj autora' }}
        </h3>
      </template>

      <AuthorForm
        :initial-values="editedAuthorInitialValues"
        :submit-label="editedAuthorId ? 'Zapisz zmiany' : 'Zapisz autora'"
        @submit="saveAuthor"
        @cancel="closeForm"
      />
    </UCard>

    <UCard>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Autor
              </th>

              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Biografia
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
              v-for="author in authorsStore.authors"
              :key="author.id"
            >
              <td class="px-4 py-4">
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ author.firstName }} {{ author.lastName }}
                </p>
              </td>

              <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                {{ author.biography || 'Brak biografii' }}
              </td>

              <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                {{ getAuthorBooksCount(author.id) }}
              </td>

              <td class="px-4 py-4">
                <div class="flex justify-end gap-2">
                  <UButton
                    icon="i-heroicons-pencil-square"
                    color="neutral"
                    variant="ghost"
                    @click="openEditForm(author)"
                  />

                  <UButton
                    icon="i-heroicons-trash"
                    color="error"
                    variant="ghost"
                    @click="deleteAuthor(author)"
                  />
                </div>
              </td>
            </tr>

            <tr v-if="authorsStore.authors.length === 0">
              <td
                colspan="4"
                class="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Brak autorów w katalogu.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UCard>
  </div>
</template>