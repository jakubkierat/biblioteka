<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { authorSchema, type AuthorSchema } from '../../schemas/authorSchema'

interface Props {
  initialValues?: AuthorSchema
  submitLabel?: string
}

interface Emits {
  submit: [data: AuthorSchema]
  cancel: []
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: undefined,
  submitLabel: 'Zapisz autora'
})

const emit = defineEmits<Emits>()

const state = reactive<AuthorSchema>({
  firstName: props.initialValues?.firstName ?? '',
  lastName: props.initialValues?.lastName ?? '',
  biography: props.initialValues?.biography ?? ''
})

watch(
  () => props.initialValues,
  (initialValues) => {
    if (!initialValues) {
      state.firstName = ''
      state.lastName = ''
      state.biography = ''
      return
    }

    state.firstName = initialValues.firstName
    state.lastName = initialValues.lastName
    state.biography = initialValues.biography ?? ''
  },
  {
    immediate: true
  }
)

const submitForm = (event: FormSubmitEvent<AuthorSchema>) => {
  emit('submit', event.data)
}
</script>

<template>
  <UForm
    :schema="authorSchema"
    :state="state"
    class="space-y-5"
    @submit="submitForm"
  >
    <div class="grid gap-5 md:grid-cols-2">
      <UFormField
        label="Imię"
        name="firstName"
        required
      >
        <UInput
          v-model="state.firstName"
          placeholder="np. Adam"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Nazwisko"
        name="lastName"
        required
      >
        <UInput
          v-model="state.lastName"
          placeholder="np. Mickiewicz"
          class="w-full"
        />
      </UFormField>
    </div>

    <UFormField
      label="Biografia"
      name="biography"
    >
      <UTextarea
        v-model="state.biography"
        :rows="4"
        placeholder="Krótka informacja o autorze"
        class="w-full"
      />
    </UFormField>

    <div class="flex justify-end gap-3">
      <UButton
        color="neutral"
        variant="outline"
        type="button"
        @click="emit('cancel')"
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