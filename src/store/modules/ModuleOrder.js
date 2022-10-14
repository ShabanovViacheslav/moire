// import { API_BASE_URL } from '@/config'
// import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    orderInfo: null
  }),
  mutations: {
    updateOrderInfo (state, orderInfo) {
      state.orderInfo = orderInfo
    }
  }
}
