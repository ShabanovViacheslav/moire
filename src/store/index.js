import Vue from 'vue'
import Vuex from 'vuex'
import ModuleCart from '@/store/modules/ModuleCart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { ModuleCart },
  state: {
    userAccessKey: null
  },
  mutations: {
    updateUserAccessKey (state, accessKey) {
      state.userAccessKey = accessKey
    }
  },
  actions: {
  },
  getters: {
    getCountProducts (state) {
      return state.ModuleCart.cartProducts.length
    },
    getTotalCost (state) {
      let value = 0
      for (const i of state.ModuleCart.cartProducts) {
        value += i.totalPrice
      }
      return value
    }
  }
})
