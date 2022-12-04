<template>
  <FormField :title="title" :error="error">
    <textarea class="form__input form__input--area" v-model="dataValue" :name="name" :placeholder="placeholder"></textarea>
  </FormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin]
}
</script>
