<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const login = ref('')
const password = ref('')
const errorMessage = ref('')

const submitLogin = () => {
  errorMessage.value = ''

  const success = authStore.login({
    login: login.value,
    password: password.value
  })

  if (!success) {
    errorMessage.value = 'Nieprawidłowy login lub hasło.'
    return
  }

  router.push('/')
}
</script>

<template>
  <div class="mx-auto max-w-md space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Logowanie
      </h2>

      <p class="mt-1 text-gray-500 dark:text-gray-400">
        Zaloguj się jako użytkownik albo administrator.
      </p>
    </div>

    <UAlert
      v-if="errorMessage"
      color="error"
      variant="subtle"
      title="Błąd logowania"
      :description="errorMessage"
    />

    <UCard>
      <form
        class="space-y-5"
        @submit.prevent="submitLogin"
      >
        <UFormField label="Login">
          <UInput
            v-model="login"
            placeholder="user albo admin"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Hasło">
          <UInput
            v-model="password"
            type="password"
            placeholder="user123 albo admin123"
            class="w-full"
          />
        </UFormField>

        <UButton
          type="submit"
          color="primary"
          block
        >
          Zaloguj
        </UButton>
      </form>
    </UCard>

    <UCard>
      <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <p>
          Konto użytkownika: user / user123
        </p>

        <p>
          Konto administratora: admin / admin123
        </p>
      </div>
    </UCard>
  </div>
</template>