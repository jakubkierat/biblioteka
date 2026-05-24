<script setup lang="ts">
const route = useRoute()

const bookId = computed(() => String(route.params.id))
</script>

<template>
  <div class="space-y-6">
    <div>
      <UButton
        icon="i-heroicons-arrow-left"
        color="neutral"
        variant="ghost"
        :to="`/books/${bookId}`"
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

    <UCard>
      <p class="text-gray-600 dark:text-gray-300">
        Formularz edycji książki.
      </p>
    </UCard>
  </div>
</template>