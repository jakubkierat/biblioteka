<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Książki
        </h2>
        <p class="mt-1 text-gray-500 dark:text-gray-400">
          Lista książek dostępnych w katalogu biblioteki.
        </p>
      </div>

      <UButton
        icon="i-heroicons-plus"
        color="primary"
        to="/books/create"
      >
        Dodaj książkę
      </UButton>
    </div>

    <UCard>
      <p class="text-gray-600 dark:text-gray-300">
        Lista książek jest pusta.
      </p>
    </UCard>
  </div>
</template>