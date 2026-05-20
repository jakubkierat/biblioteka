<script setup lang="ts">
const route = useRoute()

const bookId = computed(() => route.params.id)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Szczegóły książki
      </h2>

      <p class="mt-1 text-gray-500 dark:text-gray-400">
        Podgląd informacji o wybranej książce.
      </p>
    </div>

    <UCard>
      <p class="text-gray-600 dark:text-gray-300">
        ID książki:
        <span class="font-semibold">
          {{ bookId }}
        </span>
      </p>
    </UCard>
  </div>
</template>