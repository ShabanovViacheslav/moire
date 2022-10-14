<template>
  <FormField :title="title" :error="error">
    <textarea class="form__input form__input--area" v-model="dataValue" :name="name" :placeholder="placeholder" required></textarea>
  </FormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin]
}
</script>
