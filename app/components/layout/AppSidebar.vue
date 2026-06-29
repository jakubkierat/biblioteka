<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <aside class="w-64 shrink-0 border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
    <nav class="space-y-2">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
        active-class="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300"
      >
        <UIcon
          name="i-heroicons-home"
          class="h-5 w-5"
        />
        <span>Panel główny</span>
      </NuxtLink>

      <NuxtLink
        to="/books"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
        active-class="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300"
      >
        <UIcon
          name="i-heroicons-book-open"
          class="h-5 w-5"
        />
        <span>Książki</span>
      </NuxtLink>

      <NuxtLink
        v-if="authStore.isAdmin"
        to="/authors"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
        active-class="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300"
      >
        <UIcon
          name="i-heroicons-user-group"
          class="h-5 w-5"
        />
        <span>Autorzy</span>
      </NuxtLink>

      <NuxtLink
        v-if="authStore.isAdmin"
        to="/categories"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
        active-class="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300"
      >
        <UIcon
          name="i-heroicons-tag"
          class="h-5 w-5"
        />
        <span>Kategorie</span>
      </NuxtLink>

      <NuxtLink
        v-if="authStore.isLoggedIn"
        to="/loans"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
        active-class="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300"
      >
        <UIcon
          name="i-heroicons-arrow-path"
          class="h-5 w-5"
        />
        <span>Wypożyczenia</span>
      </NuxtLink>
    </nav>
  </aside>
</template>