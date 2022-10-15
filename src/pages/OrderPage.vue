<template>
  <main class="content container">
    <div v-if="orderLoading" class="box">
      <div class="loader loader--dark">Минутку...Загрузка заказа</div>
    </div>
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

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <FormText title="ФИО" :error="errorData.name" placeholder="Введите ваше полное имя" name="name" v-model="orderData.name"/>

            <FormText title="Адрес доставки" :error="errorData.address" placeholder="Введите ваш адрес" name="address" v-model="orderData.address"/>

            <FormText title="Телефон" :error="errorData.phone" placeholder="Введите ваш телефон" name="phone" v-model="orderData.phone" type="tel"/>

            <FormText title="Email" :error="errorData.email" placeholder="Введите ваш Email" name="email" v-model="orderData.email" type="email" />

            <FormTextarea title="Комментарий к заказу" :error="errorData.comment" placeholder="Ваши пожелания" name="comments" v-model="orderData.comment" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <FormRadio v-for="option in deliveryData" :key="option.id" :title="option.title" :error="errorData.deliveryTypeId" v-model.number="orderData.deliveryTypeId" name="delivery" :price="option.price" :value="option.id" />
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options" v-show="paymentsData">
              <FormRadio v-for="option in paymentsData" :key="option.id" :title="option.title" :error="errorData.paymentTypeId" v-model.number="orderData.paymentTypeId" name="pay" :value="option.id" />
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem v-for="item in products" :key="item.itemId" :item="item"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b v-show="orderData.deliveryTypeId">{{ costDelivery }}</b></p>
            <p>Итого: <b>{{ getCountProducts }}</b> {{ noun }} на сумму <b>{{ getTotalCost | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import OrderItem from '@/components/Order/OrderItem.vue'
import { mapGetters, mapMutations } from 'vuex'
import amountProductMixin from '@/mixins/amountProductMixin'
import FormText from '@/components/Form/FormText.vue'
import FormTextarea from '@/components/Form/FormTextarea.vue'
import { API_BASE_URL } from '@/config'
import axios from 'axios'
import FormRadio from '@/components/Form/FormRadio.vue'
import numberFormat from '@/filters/numberFormat'
export default {
  components: { OrderItem, FormText, FormTextarea, FormRadio },
  computed: {
    ...mapGetters(['getCountProducts', 'getTotalCost']),
    amountProducts () {
      return this.getCountProducts
    },
    products () {
      return this.$store.state.ModuleCart.cartProducts
    },
    costDelivery () {
      if (!this.orderData.deliveryTypeId) {
        return
      }
      const cost = this.deliveryData.find(item => item.id === this.orderData.deliveryTypeId)
      return cost.price === '0' ? 'бесплатно' : cost.price
    }
  },
  mixins: [amountProductMixin],
  data () {
    return {
      orderData: {},
      errorData: {},
      deliveryData: [],
      paymentsData: null,
      orderLoading: false,
      formErrorMessage: ''
    }
  },
  methods: {
    ...mapMutations({ updateOrderInfo: 'ModuleOrder/updateOrderInfo', resetCart: 'ModuleCart/resetCart' }),
    loadDeliveryOptions () {
      (async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}deliveries`)
          this.deliveryData = response.data
        } catch (error) {
          console.error(error)
        }
      })()
    },
    loadPaymentsOptions () {
      (async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}payments`, {
            params: {
              deliveryTypeId: this.orderData.deliveryTypeId
            }
          })
          this.paymentsData = response.data
        } catch (error) {
          console.error(error)
        }
      })()
    },
    order () {
      this.orderLoading = true
      this.errorData = {}
      this.formErrorMessage = ''

      setTimeout(() => {
        (async () => {
          try {
            const response = await axios.post(`${API_BASE_URL}orders`, { ...this.orderData }, {
              params: {
                userAccessKey: this.$store.state.userAccessKey
              }
            })
            this.resetCart()
            this.updateOrderInfo(response.data)
            this.$router.replace({ name: 'orderInfo', params: { id: response.data.id } })
          } catch (error) {
            this.errorData = error.response.data.error.request || {}
            this.formErrorMessage = error.response.data.error.message
          } finally {
            this.orderLoading = false
          }
        })()
      }, 1000)
    }
  },
  created () {
    this.loadDeliveryOptions()
  },
  watch: {
    'orderData.deliveryTypeId': 'loadPaymentsOptions'
  },
  filters: { numberFormat }
}
</script>

<style scoped>
.options__label {
  position: relative;
}
.box {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding-top: 20%;
  background-color: rgba(0, 0, 0, 0.5);
}
.loader {
  position: relative;
}
.loader--dark {
  font-size: 65px;
}
</style>
