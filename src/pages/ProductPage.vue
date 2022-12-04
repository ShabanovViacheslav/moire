<template>
  <main class="content container">
    <div class="content__top" v-if="productData">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'home' }">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'home', query: { categoryId: productData.category.id } }">{{ productData.category.title }}</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ productData.title }}
          </a>
        </li>
      </ul>
    </div>

    <div class="loader" v-if="productLoading">Минутку...Загрузка товара</div>
    <div v-else-if="productLoadingFailed">Ой...не удалось загрузить товар</div>
    <section class="item" v-else-if="productData">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="urlImage" v-if="urlImage" :alt="productData.title">
          <p class="catalog__alt" v-else>Извините, изображение товара отсутсвует</p>
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="product in productData.colors" :key="product.id">
            <a href="" class="pics__link pics__link--current" v-if="product.gallery">
              <img width="98" height="98" :src="product.gallery[0].file.url" alt="Название товара">
            </a>
            <p class="catalog__alt" v-else>Извините, изображение товара отсутсвует</p>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productData.id }}</span>
        <h2 class="item__title">
          {{ productData.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="(amountProduct > 1) ? amountProduct-- : 1">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" :value="amountProduct" name="count">

                <button type="button" aria-label="Добавить один товар" @click.prevent="amountProduct++">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price">
                {{ productData.price | numberFormat }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in productData.colors" :key="color.id">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" :value="color" v-model.number="valuesObject">
                      <span class="colors__value" :style="{backgroundColor: color.color.code}">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category" v-model="selectedSize">
                    <option v-for="size in productData.sizes" :key="size.id" :value="size.id">{{ size.title }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit" :disabled="!onView">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link" :class="{ 'tabs__link--current': currentTab === tabs[0] }" href="#" @click.prevent="currentTab = tabs[0]">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" :class="{ 'tabs__link--current': currentTab === tabs[1] }" href="#" @click.prevent="currentTab = tabs[1]">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <keep-alive>
          <component v-bind:is="currentTab"></component>
        </keep-alive>

      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import ProductInfo from '@/components/Product/ProductInfo.vue'
import ProductDelivery from '@/components/Product/ProductDelivery.vue'
import { mapActions } from 'vuex'
import numberFormat from '@/filters/numberFormat'
export default {
  data () {
    return {
      productLoading: true,
      productLoadingFailed: true,
      productData: null,
      selectedColor: 0,
      selectedSize: 0,
      amountProduct: 1,
      currentTab: ProductInfo,
      tabs: [ProductInfo, ProductDelivery],
      productAdded: false,
      productAddSending: false,
      urlImage: '',
      valuesObject: {}
    }
  },
  methods: {
    ...mapActions({ addProductToCart: 'ModuleCart/addProductToCart' }),
    loadProduct () {
      this.productLoading = true
      this.productLoadingFailed = false
      setTimeout(() => {
        (async () => {
          try {
            const response = await axios.get(`${API_BASE_URL}products/${this.$route.params.id}`)
            this.productData = response.data
            this.selectedColor = response.data.colors[0].color.id
            this.selectedSize = response.data.sizes[0].id
            if (response.data.colors[0].gallery) {
              this.urlImage = response.data.colors[0].gallery[0].file.url
            }
            this.productLoading = false
          } catch (error) {
            this.productLoading = false
            this.productLoadingFailed = true
            console.error(error)
          }
        })()
      }, 500)
    },
    addToCart () {
      this.productAdded = false
      this.productAddSending = true;
      (async () => {
        try {
          await this.addProductToCart({ productId: this.productData.id, quantity: this.amountProduct, colorId: this.selectedColor, sizeId: this.selectedSize })
          this.productAdded = true
          this.productAddSending = false
        } catch (error) {
          console.error(error)
        }
      })()
    }
  },
  watch: {
    '$route.params.id': {
      handler () {
        this.loadProduct()
      },
      immediate: true
    },
    valuesObject () {
      this.selectedColor = this.valuesObject.color.id
      if (this.valuesObject.gallery) {
        this.urlImage = this.valuesObject.gallery[0].file.url
      } else this.urlImage = ''
    }
  },
  components: { ProductInfo, ProductDelivery },
  computed: {
    onView () {
      return Boolean(this.selectedColor) && Boolean(this.selectedSize)
    }
  },
  filters: { numberFormat }
}
</script>

<style>

</style>
