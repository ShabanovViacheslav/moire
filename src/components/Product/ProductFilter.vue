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

  <BaseFormCheck :data="materialsData" name="Материал" @input="selectedMaterials = $event" :signal.sync="modifierMaterial"/>

  <BaseFormCheck :data="seasonsData" name="Коллекция" @input="selectedSeasons = $event" :signal.sync="modifierSeason"/>

  <button class="filter__submit button button--primery" type="submit">
    Применить
  </button>
  <button class="filter__reset button button--second" type="button" @click.prevent="reset" v-show="onView">
    Сбросить
  </button>
</form>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import BaseFormCheck from '@/components/Base/BaseFormCheck.vue'
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
      modifierMaterial: 0,
      selectedSeasons: [],
      modifierSeason: 0,
      selectedColors: [],
      selectedMinPrice: 0,
      selectedMaxPrice: 0
    }
  },
  computed: {
    onView () {
      return Boolean(this.selectedCategory) || Boolean(this.selectedMaterials.length) || Boolean(this.selectedSeasons.length) || Boolean(this.selectedColors.length) || Boolean(this.selectedMinPrice) || Boolean(this.selectedMaxPrice)
    }
  },
  methods: {
    getCategories () {
      (async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}productCategories`)
          this.categoriesData = response.data.items
        } catch (error) {
          console.error(error)
        }
      })()
    },
    getMaterials () {
      (async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}materials`)
          this.materialsData = response.data.items
        } catch (error) {
          console.error(error)
        }
      })()
    },
    getSeasons () {
      (async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}seasons`)
          this.seasonsData = response.data.items
        } catch (error) {
          console.error(error)
        }
      })()
    },
    getColors () {
      (async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}colors`)
          this.colorsData = response.data.items
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
      if (this.selectedMinPrice) this.selectedMinPrice = 0
      if (this.selectedMaxPrice) this.selectedMaxPrice = 0
      if (this.selectedCategory) this.selectedCategory = 0
      if (!this.modifierMaterial) this.modifierMaterial = 1
      if (!this.modifierSeason) this.modifierSeason = 1
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
    this.selectedCategory = this.category
  },
  components: { BaseFormCheck }
}
</script>

<style>

</style>
