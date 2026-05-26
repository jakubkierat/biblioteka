<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { bookSchema, type BookSchema } from '~/schemas/bookSchema'
import type { Author } from '~/types/author'
import type { Category } from '~/types/category'

interface Props {
  authors: Author[]
  categories: Category[]
  initialValues?: BookSchema
  submitLabel?: string
  cancelTo?: string
}

interface Emits {
  submit: [data: BookSchema]
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: undefined,
  submitLabel: 'Zapisz książkę',
  cancelTo: '/books'
})

const emit = defineEmits<Emits>()

const state = reactive<BookSchema>({
  title: props.initialValues?.title ?? '',
  isbn: props.initialValues?.isbn ?? '',
  authorId: props.initialValues?.authorId ?? '',
  categoryId: props.initialValues?.categoryId ?? '',
  publishedYear: props.initialValues?.publishedYear ?? new Date().getFullYear(),
  description: props.initialValues?.description ?? '',
  status: props.initialValues?.status ?? 'available'
})

watch(
  () => props.initialValues,
  (initialValues) => {
    if (!initialValues) {
      return
    }

    state.title = initialValues.title
    state.isbn = initialValues.isbn
    state.authorId = initialValues.authorId
    state.categoryId = initialValues.categoryId
    state.publishedYear = initialValues.publishedYear
    state.description = initialValues.description
    state.status = initialValues.status
  },
  {
    immediate: true
  }
)

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
        class="w-full"
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
        class="w-full"
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
          class="w-full"
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
          class="w-full"
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
          class="w-full"
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
          class="w-full"
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
        class="w-full"
      />
    </UFormField>

    <div class="flex justify-end gap-3">
      <UButton
        color="neutral"
        variant="outline"
        :to="props.cancelTo"
      >
        Anuluj
      </UButton>

      <UButton
        type="submit"
        color="primary"
        icon="i-heroicons-check"
      >
        {{ props.submitLabel }}
      </UButton>
    </div>
  </UForm>
</template>