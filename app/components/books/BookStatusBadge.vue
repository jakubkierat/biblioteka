<script setup lang="ts">
import type { BookStatus } from '~/types/book'

interface Props {
  status: BookStatus
}

defineProps<Props>()
</script>

<template>
  <UBadge
    v-if="status === 'available'"
    color="success"
    variant="subtle"
  >
    Dostępna
  </UBadge>

  <UBadge
    v-else
    color="warning"
    variant="subtle"
  >
    Wypożyczona
  </UBadge>
</template>