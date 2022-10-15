<template>
  <li class="cart__order">
    <h3>{{ item.title || item.product.title }}</h3>
    <b>{{ item.price | numberFormat }} ₽</b>
    <span>Артикул: {{ item.id }}</span>
  </li>
</template>

<script>
import numberFormat from '@/filters/numberFormat'
export default {
  props: ['item'],
  filters: { numberFormat }
}
</script>

<style>

</style>
