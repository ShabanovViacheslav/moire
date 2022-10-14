<template>
  <li class="cart__order">
    <h3>{{ item.title }}</h3>
    <b>{{ item.price }} ₽</b>
    <span>Артикул: {{ item.id }}</span>
  </li>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>

</style>
