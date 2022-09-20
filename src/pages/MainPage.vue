<template>
    <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ amountProducts }} {{ noun }}
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <aside class="filter">
        <ProductFilter :category.sync="filterCategoryId" :materials.sync="filterMaterialIds" :seasons.sync="filterSeasonIds" :colors.sync="filterColorIds" :minPrice.sync="filterMinPrice" :maxPrice.sync="filterMaxPrice"/>
      </aside>

      <section class="catalog">
        <div class="loader" v-if="productsLoading">Минутку...Загрузка товара</div>
        <div v-else-if="productsLoadingFailed">Ой...не удалось загрузить каталог</div>
        <div v-else-if="productsData">
          <ul class="catalog__list">
            <ProductItem v-for="product in productsData.items" :product="product" :key="product.id"/>
          </ul>
          <BasePagination :pages="productsData.pagination.pages" v-model="page"/>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import ProductItem from '@/components/Product/ProductItem.vue'
import BasePagination from '@/components/Base/BasePagination.vue'
import amountProductMixin from '@/mixins/amountProductMixin'
import ProductFilter from '@/components/Product/ProductFilter.vue'
import { API_BASE_URL } from '@/config'
export default {
  mixins: [amountProductMixin],
  components: { ProductItem, BasePagination, ProductFilter },
  data () {
    return {
      filterCategoryId: 0,
      filterMaterialIds: [],
      filterSeasonIds: [],
      filterColorIds: [],
      page: 1,
      productsPerPage: 3,
      filterMinPrice: 0,
      filterMaxPrice: 0,
      productsLoading: false,
      productsLoadingFailed: false,
      productsData: null
    }
  },
  computed: {
    amountProducts () {
      return this.productsData ? this.productsData.pagination.total : 0
    }
  },
  methods: {
    loadProductsData () {
      this.productsLoading = true
      this.productsLoadingFailed = false
      setTimeout(() => {
        (async () => {
          try {
            const response = await axios.get(`${API_BASE_URL}products`, {
              params: {
                page: this.page,
                limit: this.productsPerPage,
                minPrice: this.filterMinPrice,
                maxPrice: this.filterMaxPrice,
                categoryId: this.filterCategoryId,
                colorIds: this.filterColorIds,
                materialIds: this.filterMaterialIds,
                seasonIds: this.filterSeasonIds
              }
            })
            this.productsData = response.data
            this.productsLoading = false
          } catch (error) {
            this.productsLoading = false
            this.productsLoadingFailed = true
            console.error(error)
          }
        })()
      }, 500)
    }
  },
  watch: {
    page () {
      this.loadProductsData()
    },
    filterCategoryId () {
      this.loadProductsData()
    },
    filterMaterialIds () {
      this.loadProductsData()
    },
    filterSeasonIds () {
      this.loadProductsData()
    },
    filterColorIds () {
      this.loadProductsData()
    },
    filterMinPrice () {
      this.loadProductsData()
    },
    filterMaxPrice () {
      this.loadProductsData()
    }
  },
  created () {
    if (this.$route.query.categoryId) {
      this.filterCategoryId = Number(this.$route.query.categoryId)
      this.$router.replace({ name: 'home' })
    }
    this.loadProductsData()
  }
}
</script>

<style>
.colors__value {
  border: 1px solid black;
}
 .loader {
  color: #e02d71;
  font-size: 20px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load6 1.7s infinite ease;
  animation: load6 1.7s infinite ease;
}
@-webkit-keyframes load6 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@keyframes load6 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
</style>
