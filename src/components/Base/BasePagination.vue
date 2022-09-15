<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled': currentPage === 1}" aria-label="Предыдущая страница" @click.prevent="previousPage">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="page in pages" :key="page">
      <a href="#" class="pagination__link" :class="{'pagination__link--current': page === currentPage}" @click.prevent="paginate(page)">
        {{ page }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled': currentPage === pages}" href="#" aria-label="Следующая страница" @click.prevent="nextPage">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['pages', 'currentPage'],
  model: {
    prop: 'currentPage',
    event: 'paginate'
  },
  methods: {
    paginate (currentPage) {
      this.$emit('paginate', currentPage)
    },
    nextPage () {
      if (this.currentPage < this.pages) {
        this.paginate(this.currentPage + 1)
      }
    },
    previousPage () {
      if (this.currentPage > 1) {
        this.paginate(this.currentPage - 1)
      }
    }
  }
}
</script>

<style>

</style>
