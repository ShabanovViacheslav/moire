<template>
<form class="filter__form form" action="#" method="get" @submit.prevent="submit">
  <fieldset class="form__block">
    <legend class="form__legend">Цена</legend>
    <label class="form__label form__label--price">
      <input class="form__input" type="text" name="min-price" value="0" v-model.number="selectedMinPrice">
      <span class="form__value">От</span>
    </label>
    <label class="form__label form__label--price">
      <input class="form__input" type="text" name="max-price" value="0" v-model.number="selectedMaxPrice">
      <span class="form__value">До</span>
    </label>
  </fieldset>

  <fieldset class="form__block">
    <legend class="form__legend">Категория</legend>
    <label class="form__label form__label--select">
      <select class="form__select" type="text" name="category" v-model.number="selectedCategory">
        <option value="0">Все категории</option>
        <option v-for="category in categoriesData" :key="category.id" :value="category.id">{{ category.title }}</option>
      </select>
    </label>
  </fieldset>

  <fieldset class="form__block">
    <legend class="form__legend">Цвет</legend>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in colorsData" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="checkbox" name="color" :value="color.id" v-model.number="selectedColors">
          <span class="colors__value" :style="{backgroundColor: color.code}"></span>
        </label>
      </li>
    </ul>
  </fieldset>

  <!-- <BaseFormCheck :data="materialsData" name="Материал" v-model.number="selectedMaterials"/> -->

  <fieldset class="form__block">
    <legend class="form__legend">Материал</legend>
    <ul class="check-list">
      <li class="check-list__item" v-for="material in materialsData" :key="material.id">
        <label class="check-list__label">
          <input class="check-list__check sr-only" type="checkbox" name="material" :value="material.id" v-model.number="selectedMaterials">
          <span class="check-list__desc">
            {{ material.title }}
            <span>({{ material.productsCount }})</span>
          </span>
        </label>
      </li>
    </ul>
  </fieldset>

  <fieldset class="form__block">
    <legend class="form__legend">Коллекция</legend>
    <ul class="check-list">
      <li class="check-list__item" v-for="season in seasonsData" :key="season.id">
        <label class="check-list__label">
          <input class="check-list__check sr-only" type="checkbox" name="collection" :value="season.id" v-model.number="selectedSeasons">
          <span class="check-list__desc">
            {{ season.title }}
            <span>({{ season.productsCount }})</span>
          </span>
        </label>
      </li>
    </ul>
  </fieldset>

  <button class="filter__submit button button--primery" type="submit">
    Применить
  </button>
  <button class="filter__reset button button--second" type="button" @click.prevent="reset">
    Сбросить
  </button>
</form>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '@/config'
// import BaseFormCheck from '@/components/Base/BaseFormCheck.vue'
export default {
  props: ['category', 'materials', 'seasons', 'colors', 'minPrice', 'maxPrice'],
  data () {
    return {
      categoriesData: [],
      materialsData: [],
      seasonsData: [],
      colorsData: [],
      selectedCategory: 0,
      selectedMaterials: [],
      selectedSeasons: [],
      selectedColors: [],
      selectedMinPrice: 0,
      selectedMaxPrice: 0
    }
  },
  methods: {
    getCategories () {
      (async () => {
        try {
          const responce = await axios.get(`${API_BASE_URL}productCategories`)
          this.categoriesData = responce.data.items
        } catch (error) {
          console.error(error)
        }
      })()
    },
    getMaterials () {
      (async () => {
        try {
          const responce = await axios.get(`${API_BASE_URL}materials`)
          this.materialsData = responce.data.items
        } catch (error) {
          console.error(error)
        }
      })()
    },
    getSeasons () {
      (async () => {
        try {
          const responce = await axios.get(`${API_BASE_URL}seasons`)
          this.seasonsData = responce.data.items
        } catch (error) {
          console.error(error)
        }
      })()
    },
    getColors () {
      (async () => {
        try {
          const responce = await axios.get(`${API_BASE_URL}colors`)
          this.colorsData = responce.data.items
        } catch (error) {
          console.error(error)
        }
      })()
    },
    submit () {
      this.$emit('update:category', this.selectedCategory)
      this.$emit('update:materials', this.selectedMaterials)
      this.$emit('update:seasons', this.selectedSeasons)
      this.$emit('update:colors', this.selectedColors)
      this.$emit('update:minPrice', this.selectedMinPrice)
      this.$emit('update:maxPrice', this.selectedMaxPrice)
    },
    reset () {
      this.$emit('update:category', 0)
      this.$emit('update:materials', [])
      this.$emit('update:seasons', [])
      this.$emit('update:colors', [])
      this.$emit('update:minPrice', 0)
      this.$emit('update:maxPrice', 0)
    }
  },
  watch: {
    category (value) {
      this.selectedCategory = value
    },
    materials (value) {
      this.selectedMaterials = value
    },
    seasons (value) {
      this.selectedSeasons = value
    },
    colors (value) {
      this.selectedColors = value
    },
    minPrice (value) {
      this.selectedMinPrice = value
    },
    maxPrice (value) {
      this.selectedMaxPrice = value
    }
  },
  created () {
    this.getCategories()
    this.getMaterials()
    this.getSeasons()
    this.getColors()
  }
  // components: { BaseFormCheck }
}
</script>

<style>

</style>
