<template>
  <li class="catalog__item">
    <router-link :to="{name: 'product', params: {id: product.id}}" class="catalog__pic">
      <img :src="urlImage" v-if="urlImage" :alt="product.title">
      <p class="catalog__alt" v-else>Извините, изображение товара отсутсвует</p>
    </router-link>

    <h3 class="catalog__title">
      {{ product.title }}
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :name="color.color.title" :value="color" v-model="valuesObject">
          <span class="colors__value" :style="{backgroundColor: color.color.code}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/filters/numberFormat'
export default {
  props: ['product'],
  filters: { numberFormat },
  data () {
    return {
      urlImage: '',
      valuesObject: {}
    }
  },
  created () {
    if (this.product.colors[0].gallery) {
      this.urlImage = this.product.colors[0].gallery[0].file.url
    }
  },
  watch: {
    valuesObject () {
      if (this.valuesObject.gallery) {
        this.urlImage = this.valuesObject.gallery[0].file.url
      } else this.urlImage = ''
    }
  }
}
</script>

<style lang="scss">
  .catalog {
    &__alt {
      color: #222;
      font-style: italic;
    }
  }
</style>
