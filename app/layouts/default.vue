<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <AppHeader />

    <div class="flex">
      <AppSidebar />

      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>