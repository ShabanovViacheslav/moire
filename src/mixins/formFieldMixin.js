import FormField from '@/components/Form/FormField.vue'

export default {
  components: { FormField },
  props: ['title', 'error', 'placeholder', 'value', 'name'],
  computed: {
    dataValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
