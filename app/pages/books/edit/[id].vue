<script setup lang="ts">
import BookForm from '../../../components/books/BookForm.vue'
import type { BookSchema } from '../../../schemas/bookSchema'
import { useAuthorsStore } from '../../../stores/authors'
import { useBooksStore } from '../../../stores/books'
import { useCategoriesStore } from '../../../stores/categories'

definePageMeta({
  middleware: 'role',
  roles: ['admin']
})

const route = useRoute()
const router = useRouter()

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()
const categoriesStore = useCategoriesStore()

const bookId = computed(() => String(route.params.id))

const book = computed(() => {
  return booksStore.getBookById(bookId.value)
})

const initialValues = computed<BookSchema | undefined>(() => {
  if (!book.value) {
    return undefined
  }

  return {
    title: book.value.title,
    isbn: book.value.isbn,
    authorId: book.value.authorId,
    categoryId: book.value.categoryId,
    publishedYear: book.value.publishedYear,
    description: book.value.description,
    status: book.value.status
  }
})

const updateBook = (data: BookSchema) => {
  const updatedBook = booksStore.updateBook(bookId.value, {
    title: data.title,
    isbn: data.isbn,
    authorId: data.authorId,
    categoryId: data.categoryId,
    publishedYear: data.publishedYear,
    description: data.description,
    status: data.status
  })

  if (!updatedBook) {
    return
  }

  router.push(`/books/${updatedBook.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <UButton
        icon="i-heroicons-arrow-left"
        color="neutral"
        variant="ghost"
        :to="book ? `/books/${book.id}` : '/books'"
        class="mb-4"
      >
        Wróć do szczegółów
      </UButton>

      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Edycja książki
      </h2>

      <p class="mt-1 text-gray-500 dark:text-gray-400">
        Zmień dane wybranej książki.
      </p>
    </div>

    <UAlert
      v-if="!book"
      color="error"
      variant="subtle"
      title="Nie znaleziono książki"
      description="Wybrana książka nie istnieje albo została usunięta."
    />

    <UCard v-else>
      <BookForm
        v-if="initialValues"
        :authors="authorsStore.authors"
        :categories="categoriesStore.categories"
        :initial-values="initialValues"
        :cancel-to="`/books/${book.id}`"
        submit-label="Zapisz zmiany"
        @submit="updateBook"
      />
    </UCard>
  </div>
</template>