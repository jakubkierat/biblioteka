<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { bookSchema, type BookSchema } from '~/schemas/bookSchema'
import type { Author } from '~/types/author'
import type { Category } from '~/types/category'

interface Props {
  authors: Author[]
  categories: Category[]
}

interface Emits {
  submit: [data: BookSchema]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const state = reactive<BookSchema>({
  title: '',
  isbn: '',
  authorId: '',
  categoryId: '',
  publishedYear: new Date().getFullYear(),
  description: '',
  status: 'available'
})

const authorItems = computed(() => {
  return props.authors.map((author) => ({
    label: `${author.firstName} ${author.lastName}`,
    value: author.id
  }))
})

const categoryItems = computed(() => {
  return props.categories.map((category) => ({
    label: category.name,
    value: category.id
  }))
})

const statusItems = [
  {
    label: 'Dostępna',
    value: 'available'
  },
  {
    label: 'Wypożyczona',
    value: 'borrowed'
  }
]

const submitForm = (event: FormSubmitEvent<BookSchema>) => {
  emit('submit', event.data)
}
</script>

<template>
  <UForm
    :schema="bookSchema"
    :state="state"
    class="space-y-5"
    @submit="submitForm"
  >
    <UFormField
      label="Tytuł"
      name="title"
      required
    >
      <UInput
        v-model="state.title"
        placeholder="np. Pan Tadeusz"
      />
    </UFormField>

    <UFormField
      label="ISBN"
      name="isbn"
      required
    >
      <UInput
        v-model="state.isbn"
        placeholder="np. 9788373271890"
      />
    </UFormField>

    <div class="grid gap-5 md:grid-cols-2">
      <UFormField
        label="Autor"
        name="authorId"
        required
      >
        <USelect
          v-model="state.authorId"
          :items="authorItems"
          placeholder="Wybierz autora"
        />
      </UFormField>

      <UFormField
        label="Kategoria"
        name="categoryId"
        required
      >
        <USelect
          v-model="state.categoryId"
          :items="categoryItems"
          placeholder="Wybierz kategorię"
        />
      </UFormField>
    </div>

    <div class="grid gap-5 md:grid-cols-2">
      <UFormField
        label="Rok wydania"
        name="publishedYear"
        required
      >
        <UInput
          v-model="state.publishedYear"
          type="number"
          placeholder="np. 2024"
        />
      </UFormField>

      <UFormField
        label="Status"
        name="status"
        required
      >
        <USelect
          v-model="state.status"
          :items="statusItems"
        />
      </UFormField>
    </div>

    <UFormField
      label="Opis"
      name="description"
      required
    >
      <UTextarea
        v-model="state.description"
        :rows="5"
        placeholder="Krótki opis książki"
      />
    </UFormField>

    <div class="flex justify-end gap-3">
      <UButton
        color="neutral"
        variant="outline"
        to="/books"
      >
        Anuluj
      </UButton>

      <UButton
        type="submit"
        color="primary"
        icon="i-heroicons-check"
      >
        Zapisz książkę
      </UButton>
    </div>
  </UForm>
</template>