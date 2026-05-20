<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Panel główny
      </h2>
      <p class="mt-1 text-gray-500 dark:text-gray-400">
        Szybki podgląd najważniejszych informacji o bibliotece.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Wszystkie książki
            </p>
            <p class="mt-2 text-3xl font-bold">
              0
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
              0
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
              0
            </p>
          </div>

          <UIcon name="i-heroicons-clock" class="h-8 w-8 text-primary-500" />
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Autorzy
            </p>
            <p class="mt-2 text-3xl font-bold">
              0
            </p>
          </div>

          <UIcon name="i-heroicons-user-group" class="h-8 w-8 text-primary-500" />
        </div>
      </UCard>
    </div>
  </div>
</template>