<script setup lang="ts">
import BookStatusBadge from '../../components/books/BookStatusBadge.vue'
import { useAuthStore } from '../../stores/auth'
import { useAuthorsStore } from '../../stores/authors'
import { useBooksStore } from '../../stores/books'
import { useCategoriesStore } from '../../stores/categories'
import { useLoansStore } from '../../stores/loans'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()
const categoriesStore = useCategoriesStore()
const loansStore = useLoansStore()

const borrowerName = ref('')

const bookId = computed(() => String(route.params.id))

const book = computed(() => {
  return booksStore.getBookById(bookId.value)
})

const authorName = computed(() => {
  if (!book.value) {
    return ''
  }

  return authorsStore.getAuthorFullName(book.value.authorId)
})

const categoryName = computed(() => {
  if (!book.value) {
    return ''
  }

  return categoriesStore.getCategoryName(book.value.categoryId)
})

const activeLoan = computed(() => {
  return loansStore.getActiveLoanByBookId(bookId.value)
})

const bookLoans = computed(() => {
  return loansStore.loans.filter((loan) => loan.bookId === bookId.value)
})

const borrowBook = () => {
  const trimmedBorrowerName = borrowerName.value.trim()

  if (!book.value || !trimmedBorrowerName) {
    return
  }

  loansStore.addLoan(book.value.id, trimmedBorrowerName)
  booksStore.setBookStatus(book.value.id, 'borrowed')
  borrowerName.value = ''
}

const returnBook = () => {
  if (!book.value) {
    return
  }

  loansStore.returnLoan(book.value.id)
  booksStore.setBookStatus(book.value.id, 'available')
}

const deleteBook = () => {
  if (!book.value) {
    return
  }

  const confirmed = window.confirm('Czy na pewno usunąć tę książkę?')

  if (!confirmed) {
    return
  }

  booksStore.deleteBook(book.value.id)
  router.push('/books')
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
          to="/books"
          class="mb-4"
        >
          Wróć do listy
        </UButton>

        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Szczegóły książki
        </h2>

        <p class="mt-1 text-gray-500 dark:text-gray-400">
          Informacje o wybranej pozycji w katalogu.
        </p>
      </div>

      <div
        v-if="book && authStore.isAdmin"
        class="flex flex-wrap gap-2"
      >
        <NuxtLink :to="`/books/edit/${book.id}`">
          <UButton
            icon="i-heroicons-pencil-square"
            color="neutral"
            variant="outline"
            type="button"
          >
            Edytuj
          </UButton>
        </NuxtLink>

        <UButton
          icon="i-heroicons-trash"
          color="error"
          variant="outline"
          type="button"
          @click="deleteBook"
        >
          Usuń
        </UButton>
      </div>
    </div>

    <UAlert
      v-if="!book"
      color="error"
      variant="subtle"
      title="Nie znaleziono książki"
      description="Wybrana książka nie istnieje albo została usunięta."
    />

    <div
      v-else
      class="grid gap-6 lg:grid-cols-[2fr_1fr]"
    >
      <div class="space-y-6">
        <UCard>
          <template #header>
            <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ book.title }}
                </h3>

                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  ISBN: {{ book.isbn }}
                </p>
              </div>

              <BookStatusBadge :status="book.status" />
            </div>
          </template>

          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Autor
              </p>

              <p class="mt-1 font-medium text-gray-900 dark:text-white">
                {{ authorName }}
              </p>
            </div>

            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Kategoria
              </p>

              <p class="mt-1 font-medium text-gray-900 dark:text-white">
                {{ categoryName }}
              </p>
            </div>

            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Rok wydania
              </p>

              <p class="mt-1 font-medium text-gray-900 dark:text-white">
                {{ book.publishedYear }}
              </p>
            </div>

            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Status
              </p>

              <p class="mt-1 font-medium text-gray-900 dark:text-white">
                {{ book.status === 'available' ? 'Dostępna' : 'Wypożyczona' }}
              </p>
            </div>
          </div>

          <div class="mt-6">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Opis
            </p>

            <p class="mt-2 leading-7 text-gray-700 dark:text-gray-300">
              {{ book.description }}
            </p>
          </div>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">
              Historia wypożyczeń
            </h3>
          </template>

          <div
            v-if="bookLoans.length"
            class="space-y-3"
          >
            <div
              v-for="loan in bookLoans"
              :key="loan.id"
              class="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
            >
              <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ loan.borrowerName }}
                  </p>

                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Wypożyczono: {{ new Date(loan.borrowedAt).toLocaleDateString('pl-PL') }}
                  </p>

                  <p
                    v-if="loan.returnedAt"
                    class="mt-1 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Zwrócono: {{ new Date(loan.returnedAt).toLocaleDateString('pl-PL') }}
                  </p>
                </div>

                <UBadge
                  :color="loan.status === 'active' ? 'warning' : 'success'"
                  variant="subtle"
                >
                  {{ loan.status === 'active' ? 'Aktywne' : 'Zwrócone' }}
                </UBadge>
              </div>
            </div>
          </div>

          <p
            v-else
            class="text-sm text-gray-500 dark:text-gray-400"
          >
            Brak historii wypożyczeń dla tej książki.
          </p>
        </UCard>
      </div>

      <div class="space-y-6">
        <UCard v-if="authStore.isUser || authStore.isAdmin">
          <template #header>
            <h3 class="text-lg font-semibold">
              Obsługa książki
            </h3>
          </template>

          <div
            v-if="book.status === 'available'"
            class="space-y-4"
          >
            <UFormField label="Imię i nazwisko wypożyczającego">
              <UInput
                v-model="borrowerName"
                placeholder="np. Jan Kowalski"
              />
            </UFormField>

            <UButton
              icon="i-heroicons-arrow-up-tray"
              color="primary"
              block
              :disabled="!borrowerName.trim()"
              @click="borrowBook"
            >
              Wypożycz książkę
            </UButton>
          </div>

          <div
            v-else
            class="space-y-4"
          >
            <div
              v-if="activeLoan"
              class="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
            >
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Aktualnie wypożyczona przez
              </p>

              <p class="mt-1 font-medium text-gray-900 dark:text-white">
                {{ activeLoan.borrowerName }}
              </p>

              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Data wypożyczenia:
                {{ new Date(activeLoan.borrowedAt).toLocaleDateString('pl-PL') }}
              </p>
            </div>

            <UButton
              icon="i-heroicons-arrow-down-tray"
              color="success"
              block
              @click="returnBook"
            >
              Zwróć książkę
            </UButton>
          </div>
        </UCard>

        <UCard v-else>
          <template #header>
            <h3 class="text-lg font-semibold">
              Obsługa książki
            </h3>
          </template>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            Zaloguj się jako użytkownik, aby wypożyczać i zwracać książki.
          </p>

          <UButton
            class="mt-4"
            color="primary"
            to="/login"
          >
            Zaloguj
          </UButton>
        </UCard>
      </div>
    </div>
  </div>
</template>