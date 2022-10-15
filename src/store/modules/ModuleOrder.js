import { API_BASE_URL } from '@/config'
import axios from 'axios'
import router from '@/router/index.js'

export default {
  namespaced: true,
  state: () => ({
    orderInfo: null
  }),
  mutations: {
    updateOrderInfo (state, orderInfo) {
      state.orderInfo = orderInfo
    }
  },
  actions: {
    loadOrderInfo (context, orderId) {
      return (async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}orders/${orderId}`, {
            params: {
              userAccessKey: context.rootState.userAccessKey
            }
          })
          context.commit('updateOrderInfo', response.data)
        } catch (error) {
          router.replace({ name: 'notFound' })
          console.error(error)
        }
      })()
    }
  }
}
