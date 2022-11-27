<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{ name }}</legend>
    <ul class="check-list">
      <li class="check-list__item" v-for="item in data" :key="item.id">
        <label class="check-list__label">
          <input class="check-list__check sr-only" type="checkbox" :name="name" :value="item.id" v-model="object">
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
  data () {
    return {
      object: []
    }
  },
  props: {
    data: Array,
    name: String,
    signal: Number
  },
  watch: {
    object () {
      this.$emit('input', this.object)
      this.$emit('update:signal', 0)
    },
    signal () {
      if (this.signal) {
        this.object = []
      }
    }
  }
}
</script>

<style>

</style>
