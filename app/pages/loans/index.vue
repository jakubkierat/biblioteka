<script setup lang="ts">
import { useAuthorsStore } from '~/stores/authors'
import { useBooksStore } from '~/stores/books'
import { useLoansStore } from '~/stores/loans'

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()
const loansStore = useLoansStore()

const getBookTitle = (bookId: string) => {
  const book = booksStore.getBookById(bookId)

  if (!book) {
    return 'Usunięta książka'
  }

  return book.title
}

const getBookAuthor = (bookId: string) => {
  const book = booksStore.getBookById(bookId)

  if (!book) {
    return ''
  }

  return authorsStore.getAuthorFullName(book.authorId)
}

const returnBook = (bookId: string) => {
  loansStore.returnLoan(bookId)
  booksStore.setBookStatus(bookId, 'available')
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Wypożyczenia
      </h2>

      <p class="mt-1 text-gray-500 dark:text-gray-400">
        Obsługa wypożyczeń i zwrotów książek.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <UCard>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Wszystkie wypożyczenia
        </p>

        <p class="mt-2 text-3xl font-bold">
          {{ loansStore.loans.length }}
        </p>
      </UCard>

      <UCard>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Aktywne
        </p>

        <p class="mt-2 text-3xl font-bold">
          {{ loansStore.activeLoans.length }}
        </p>
      </UCard>

      <UCard>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Zwrócone
        </p>

        <p class="mt-2 text-3xl font-bold">
          {{ loansStore.returnedLoans.length }}
        </p>
      </UCard>
    </div>

    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">
          Aktywne wypożyczenia
        </h3>
      </template>

      <div
        v-if="loansStore.activeLoans.length"
        class="space-y-3"
      >
        <div
          v-for="loan in loansStore.activeLoans"
          :key="loan.id"
          class="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
        >
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ getBookTitle(loan.bookId) }}
              </p>

              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ getBookAuthor(loan.bookId) }}
              </p>

              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Wypożyczający: {{ loan.borrowerName }}
              </p>

              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Data wypożyczenia:
                {{ new Date(loan.borrowedAt).toLocaleDateString('pl-PL') }}
              </p>
            </div>

            <div class="flex gap-2">
              <UButton
                color="neutral"
                variant="outline"
                :to="`/books/${loan.bookId}`"
              >
                Szczegóły
              </UButton>

              <UButton
                color="success"
                @click="returnBook(loan.bookId)"
              >
                Zwróć
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <p
        v-else
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        Brak aktywnych wypożyczeń.
      </p>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">
          Historia zwrotów
        </h3>
      </template>

      <div
        v-if="loansStore.returnedLoans.length"
        class="space-y-3"
      >
        <div
          v-for="loan in loansStore.returnedLoans"
          :key="loan.id"
          class="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
        >
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ getBookTitle(loan.bookId) }}
              </p>

              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Wypożyczający: {{ loan.borrowerName }}
              </p>

              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Zwrócono:
                {{ loan.returnedAt ? new Date(loan.returnedAt).toLocaleDateString('pl-PL') : '-' }}
              </p>
            </div>

            <UBadge
              color="success"
              variant="subtle"
            >
              Zwrócone
            </UBadge>
          </div>
        </div>
      </div>

      <p
        v-else
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        Brak zakończonych wypożyczeń.
      </p>
    </UCard>
  </div>
</template>