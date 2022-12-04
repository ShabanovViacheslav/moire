<template>
  <label class="options__label">
    <slot/>
    <span class="options__value" v-if="price == 9999999999">
      {{ title }}
    </span>
    <span class="options__value" v-else>
      {{ title }} <b>{{ price }}</b>
    </span>
  </label>
</template>

<script>
export default {
  props: ['title', 'price']
}
</script>
