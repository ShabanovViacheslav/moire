import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAccessKey: null,
    cartProductsData: [],
    cartProducts: []
  },
  mutations: {
    updateCartProductsData (state, items) {
      state.cartProductsData = items
    },
    updateUserAccessKey (state, accessKey) {
      state.userAccessKey = accessKey
    },
    syncCartProducts (state) {
      // Необходимость мутации???
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity
      }))
    }
  },
  actions: {
    loadCart (context) {
      return (async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}baskets`, {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          })
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey)
          }
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProducts')
        } catch (error) {
          console.error(error)
        }
      })()
    },
    addProductToCart (context, { productId, quantity, colorId, sizeId }) {
      (async () => {
        const response = await axios.post(`${API_BASE_URL}baskets/products`, {
          productId, quantity, colorId, sizeId
        }, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        context.commit('updateCartProductsData', response.data.items)
        context.commit('syncCartProducts')
      })()
    }
  },
  getters: {
    getCountProducts (state) {
      return state.cartProducts.length
    }
  }
})
