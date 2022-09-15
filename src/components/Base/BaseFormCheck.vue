<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{ name }}</legend>
    <ul class="check-list">
      <li class="check-list__item" v-for="item in data" :key="item.id">
        <label class="check-list__label">
          <input class="check-list__check sr-only" type="checkbox" :name="name" :value="item.id" v-model="dataValue">
          <span class="check-list__desc">
            {{ item.title }}
            <span>({{ item.productsCount }})</span>
          </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
export default {
  props: ['data', 'name', 'value'],
  computed: {
    dataValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style>

</style>
