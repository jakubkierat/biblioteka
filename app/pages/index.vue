<script setup lang="ts">
import { useAuthorsStore } from '~/stores/authors'
import { useBooksStore } from '~/stores/books'
import { useLoansStore } from '~/stores/loans'

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()
const loansStore = useLoansStore()
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Panel główny
        </h2>

        <p class="mt-1 text-gray-500 dark:text-gray-400">
          Szybki podgląd najważniejszych informacji o bibliotece.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <UButton
          icon="i-heroicons-book-open"
          color="primary"
          to="/books"
        >
          Lista książek
        </UButton>

        <UButton
          icon="i-heroicons-arrow-path"
          color="neutral"
          variant="outline"
          to="/loans"
        >
          Wypożyczenia
        </UButton>

        <UButton
          icon="i-heroicons-plus"
          color="neutral"
          variant="outline"
          to="/books/create"
        >
          Dodaj książkę
        </UButton>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Wszystkie książki
            </p>

            <p class="mt-2 text-3xl font-bold">
              {{ booksStore.totalBooks }}
            </p>
          </div>

          <UIcon name="i-heroicons-book-open" class="h-8 w-8 text-primary-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Dostępne
            </p>

            <p class="mt-2 text-3xl font-bold">
              {{ booksStore.availableBooks.length }}
            </p>
          </div>

          <UIcon name="i-heroicons-check-circle" class="h-8 w-8 text-primary-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Wypożyczone
            </p>

            <p class="mt-2 text-3xl font-bold">
              {{ booksStore.borrowedBooks.length }}
            </p>
          </div>

          <UIcon name="i-heroicons-clock" class="h-8 w-8 text-primary-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Aktywne wypożyczenia
            </p>

            <p class="mt-2 text-3xl font-bold">
              {{ loansStore.activeLoans.length }}
            </p>
          </div>

          <UIcon name="i-heroicons-arrow-path" class="h-8 w-8 text-primary-500" />
        </div>
      </UCard>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">
              Katalog książek
            </h3>

            <UButton
              size="sm"
              color="primary"
              variant="soft"
              to="/books"
            >
              Otwórz
            </UButton>
          </div>
        </template>

        <div class="space-y-3">
          <div
            v-for="book in booksStore.books.slice(0, 3)"
            :key="book.id"
            class="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-800"
          >
            <div>
              <p class="font-medium">
                {{ book.title }}
              </p>

              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ book.publishedYear }}
              </p>
            </div>

            <BookStatusBadge :status="book.status" />
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">
            Statystyki katalogu
          </h3>
        </template>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-500 dark:text-gray-400">
              Autorzy
            </span>

            <span class="font-semibold">
              {{ authorsStore.authors.length }}
            </span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-gray-500 dark:text-gray-400">
              Książki dostępne
            </span>

            <span class="font-semibold">
              {{ booksStore.availableBooks.length }}
            </span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-gray-500 dark:text-gray-400">
              Książki wypożyczone
            </span>

            <span class="font-semibold">
              {{ booksStore.borrowedBooks.length }}
            </span>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>