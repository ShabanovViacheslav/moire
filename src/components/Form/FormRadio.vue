<template>
  <li class="options__item">
    <FormOption :title="title" :price="price">
      <input class="options__radio sr-only" @change="$emit('change', $event.target.value)" :type="type" :name="name" :value="value">
    </FormOption>
  </li>
</template>

<script>
import formOptionMixin from '@/mixins/formOptionMixin'

export default {
  props: {
    type: {
      default: 'radio'
    }
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  mixins: [formOptionMixin]
}
</script>
