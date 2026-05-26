<script setup lang="ts">
import BookForm from '../../components/books/BookForm.vue'
import type { BookSchema } from '../../schemas/bookSchema'
import { useAuthorsStore } from '../../stores/authors'
import { useBooksStore } from '../../stores/books'
import { useCategoriesStore } from '../../stores/categories'

const router = useRouter()

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()
const categoriesStore = useCategoriesStore()

const createBook = (data: BookSchema) => {
  const book = booksStore.addBook({
    title: data.title,
    isbn: data.isbn,
    authorId: data.authorId,
    categoryId: data.categoryId,
    publishedYear: data.publishedYear,
    description: data.description,
    status: data.status
  })

  router.push(`/books/${book.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <UButton
        icon="i-heroicons-arrow-left"
        color="neutral"
        variant="ghost"
        to="/books"
        class="mb-4"
      >
        Wróć do listy
      </UButton>

      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Dodaj książkę
      </h2>

      <p class="mt-1 text-gray-500 dark:text-gray-400">
        Uzupełnij dane książki.
      </p>
    </div>

    <UCard>
      <BookForm
        :authors="authorsStore.authors"
        :categories="categoriesStore.categories"
        @submit="createBook"
      />
    </UCard>
  </div>
</template>