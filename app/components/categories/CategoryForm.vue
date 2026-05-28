<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { categorySchema, type CategorySchema } from '../../schemas/categorySchema'

interface Props {
  initialValues?: CategorySchema
  submitLabel?: string
}

interface Emits {
  submit: [data: CategorySchema]
  cancel: []
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: undefined,
  submitLabel: 'Zapisz kategorię'
})

const emit = defineEmits<Emits>()

const state = reactive<CategorySchema>({
  name: props.initialValues?.name ?? '',
  description: props.initialValues?.description ?? ''
})

watch(
  () => props.initialValues,
  (initialValues) => {
    if (!initialValues) {
      state.name = ''
      state.description = ''
      return
    }

    state.name = initialValues.name
    state.description = initialValues.description ?? ''
  },
  {
    immediate: true
  }
)

const submitForm = (event: FormSubmitEvent<CategorySchema>) => {
  emit('submit', event.data)
}
</script>

<template>
  <UForm
    :schema="categorySchema"
    :state="state"
    class="space-y-5"
    @submit="submitForm"
  >
    <UFormField
      label="Nazwa kategorii"
      name="name"
      required
    >
      <UInput
        v-model="state.name"
        placeholder="np. Science fiction"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Opis"
      name="description"
    >
      <UTextarea
        v-model="state.description"
        :rows="4"
        placeholder="Krótki opis kategorii"
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