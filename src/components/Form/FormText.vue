<template>
  <FormField :title="title" :error="error">
    <input class="form__input" v-model="dataValue" :type="type" :name="name" :placeholder="placeholder" required>
  </FormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  props: {
    type: {
      default: 'text'
    }
  },
  mixins: [formFieldMixin]
}
</script>
