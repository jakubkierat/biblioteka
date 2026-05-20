<script setup lang="ts">
const navigationItems = [
  {
    label: 'Panel główny',
    to: '/',
    icon: 'i-heroicons-home'
  },
  {
    label: 'Książki',
    to: '/books',
    icon: 'i-heroicons-book-open'
  },
  {
    label: 'Autorzy',
    to: '/authors',
    icon: 'i-heroicons-user-group'
  },
  {
    label: 'Kategorie',
    to: '/categories',
    icon: 'i-heroicons-tag'
  },
  {
    label: 'Wypożyczenia',
    to: '/loans',
    icon: 'i-heroicons-arrow-path'
  }
]
</script>

<template>
  <aside class="min-h-[calc(100vh-4rem)] w-64 border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
    <nav class="space-y-2">
      <NuxtLink
        v-for="item in navigationItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400"
        active-class="bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300"
      >
        <UIcon :name="item.icon" class="h-5 w-5" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>