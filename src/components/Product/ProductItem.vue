<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.colors[0].gallery[0].file.url" v-if="product.colors[0].gallery" :alt="product.title">
      <p class="catalog__alt" v-else>Извините, изображение товара отсутсвует</p>
    </a>

    <h3 class="catalog__title">
      <!-- ??????????????????????????????????? Использование params и $route.replace  -->
      <router-link :to="{name: 'product', params: {id: product.id}}">{{ product.title }}</router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :name="color.color.title" :value="color.color.code">
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
  filters: { numberFormat }
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
