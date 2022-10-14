<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'home' }">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ getCountProducts }} {{ noun }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="product in products" :key="product.itemId" :product="product"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ getTotalCost }} ₽</span>
          </p>

          <router-link class="cart__button button button--primery" :to="{ name: 'order' }" type="submit" :disabled="!getTotalCost" tag="button">Оформить заказ</router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import amountProductMixin from '@/mixins/amountProductMixin'
import { mapGetters } from 'vuex'
import CartItem from '@/components/Cart/CartItem.vue'
export default {
  computed: {
    ...mapGetters(['getCountProducts', 'getTotalCost']),
    amountProducts () {
      return this.getCountProducts
    },
    products () {
      return this.$store.state.ModuleCart.cartProducts
    }
  },
  mixins: [amountProductMixin],
  components: { CartItem }
}
</script>

<style>

</style>
