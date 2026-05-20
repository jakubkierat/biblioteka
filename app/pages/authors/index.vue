<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Autorzy
        </h2>
        <p class="mt-1 text-gray-500 dark:text-gray-400">
          Zarządzanie autorami książek.
        </p>
      </div>

      <UButton icon="i-heroicons-plus" color="primary">
        Dodaj autora
      </UButton>
    </div>

    <UCard>
      <p class="text-gray-600 dark:text-gray-300">
        Lista autorów jest pusta.
      </p>
    </UCard>
  </div>
</template>