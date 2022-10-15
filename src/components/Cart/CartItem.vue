<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="product.img" v-if="product.img" :alt="product.title" width="120" height="120">
      <p class="catalog__alt" v-else>Извините, изображение товара отсутсвует</p>
    </div>
    <h3 class="product__title">
      {{ product.title }}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i class="colors__value" :style="{backgroundColor: product.colorCode}"></i>
        {{ nameColor(product) }}
      </span>
    </p>
    <span class="product__code">
      Артикул: {{ product.id }}
    </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="(amount > 1) ? amount-- : 1" :disabled="amount === 1">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count">

      <button type="button" aria-label="Добавить один товар" @click.prevent="amount++">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ product.totalPrice | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteCartProduct({basketItemId: product.itemId})">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex'
import numberFormat from '@/filters/numberFormat'
export default {
  props: ['product'],
  methods: {
    ...mapActions('ModuleCart', ['deleteCartProduct', 'updateCartProductAmount']),
    nameColor (product) {
      const colors = [{ id: 20, name: 'красный' }, { id: 21, name: 'синий' }, { id: 22, name: 'зеленый' }, { id: 23, name: 'желтый' }, { id: 24, name: 'фиолетовый' }, { id: 25, name: 'розовый' }, { id: 26, name: 'черный' }, { id: 27, name: 'белый' }]
      return colors.find(item => item.id === product.colorId).name
    }
  },
  computed: {
    amount: {
      get () {
        return this.product.quantity
      },
      set (value) {
        this.updateCartProductAmount({ basketItemId: this.product.itemId, quantity: value })
      }
    }
  },
  filters: { numberFormat }
}
</script>

<style>

</style>
