import FormOption from '@/components/Form/FormOption.vue'

export default {
  components: { FormOption },
  props: {
    price: {
      default: 9999999999
    },
    title: String,
    error: {},
    name: String,
    value: {},
    checked: {}
  }
}
