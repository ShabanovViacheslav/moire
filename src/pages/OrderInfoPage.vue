<template>
  <main class="content container" v-if="order">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'home' }">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">Корзина</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ order.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ order.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ order.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ order.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ order.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem v-for="item in order.basket.items" :key="item.itemId" :item="item"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b> {{ costDelivery }} </b></p>
            <p>Итого: <b>{{ amountProducts }}</b> {{ noun }} на сумму <b>{{ order.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import numberFormat from '@/filters/numberFormat'
import amountProductMixin from '@/mixins/amountProductMixin'
import OrderItem from '@/components/Order/OrderItem.vue'

export default {
  mixins: [amountProductMixin],
  filters: { numberFormat },
  watch: {
    '$route.params.id': function () {
      this.loadOrderInfo(this.$route.params.id)
    }
  },
  created () {
    if (this.$store.state.ModuleOrder.orderInfo && this.$store.state.ModuleOrder.orderInfo.id === this.$route.params.id) {
      return
    }
    this.loadOrderInfo(this.$route.params.id)
  },
  computed: {
    ...mapState('ModuleOrder', { order: state => state.orderInfo }),
    costDelivery () {
      return this.order.deliveryType.price === '0' ? 'бесплатно' : this.order.deliveryType.price
    },
    amountProducts () {
      return this.order.basket.items.length
    }
  },
  methods: {
    ...mapActions({ loadOrderInfo: 'ModuleOrder/loadOrderInfo' })
  },
  components: { OrderItem }
}
</script>

<style>

</style>
