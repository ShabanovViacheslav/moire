import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '@/config'

Vue.use(Vuex)

// const ModuleCart = {
//   state: () => ({
//     moduleC: 'Value'
//   }),
//   mutations: {},
//   actions: {
//   }
// }

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
      state.cartProducts = state.cartProductsData.map((item) => ({
        title: item.product.title,
        id: item.product.id,
        itemId: item.id,
        colorId: item.color.color.id,
        colorCode: item.color.color.code,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.quantity * item.price,
        img: item.color.gallery ? item.color.gallery[0].file.url : null
      }))
    },
    updateCartProductAmount (state, { basketItemId, quantity }) {
      const item = state.cartProducts.find((i) => i.itemId === basketItemId)

      if (item) {
        item.quantity = quantity
        item.totalPrice = quantity * item.price
      }
    },
    deleteCartProduct (state, { basketItemId }) {
      const item = state.cartProducts.find((i) => i.itemId === basketItemId)

      if (item) {
        state.cartProducts = state.cartProducts.filter((product) => (!(product.itemId === basketItemId)))
      }
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
    },
    updateCartProductAmount (context, { basketItemId, quantity }) {
      context.commit('updateCartProductAmount', { basketItemId, quantity });
      (async () => {
        try {
          const response = await axios.put(`${API_BASE_URL}baskets/products`, {
            basketItemId, quantity
          }, {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          })
          context.commit('updateCartProductsData', response.data.items)
        } catch (error) {
          console.log(error)
          context.commit('syncCartProducts')
        }
      })()
    },
    deleteCartProduct (context, { basketItemId }) {
      context.commit('deleteCartProduct', { basketItemId });
      (async () => {
        try {
          const response = await axios.delete(`${API_BASE_URL}baskets/products`, {
            data: { basketItemId },
            params: { userAccessKey: context.state.userAccessKey }
          })
          context.commit('updateCartProductsData', response.data.items)
        } catch (error) {
          console.log(error)
          context.commit('syncCartProducts')
        }
      })()
    }
  },
  getters: {
    getCountProducts (state) {
      return state.cartProducts.length
    },
    getTotalCost (state) {
      let value = 0
      for (const i of state.cartProducts) {
        value += i.totalPrice
      }
      return value
    }
  }
})
