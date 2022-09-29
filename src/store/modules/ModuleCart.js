import { API_BASE_URL } from '@/config'
import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    cartProductsData: [],
    cartProducts: []
  }),
  mutations: {
    updateCartProductsData (state, items) {
      state.cartProductsData = items
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
    deleteCartProduct (state, { basketItemId }) {
      const item = state.cartProducts.find((i) => i.itemId === basketItemId)

      if (item) {
        state.cartProducts = state.cartProducts.filter((product) => (!(product.itemId === basketItemId)))
      }
    },
    updateCartProductAmount (state, { basketItemId, quantity }) {
      const item = state.cartProducts.find((i) => i.itemId === basketItemId)

      if (item) {
        item.quantity = quantity
        item.totalPrice = quantity * item.price
      }
    }
  },
  actions: {
    loadCart (context) {
      return (async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}baskets`, {
            params: {
              userAccessKey: context.rootState.userAccessKey
            }
          })
          if (!context.rootState.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateUserAccessKey', response.data.user.accessKey, { root: true })
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
            userAccessKey: context.rootState.userAccessKey
          }
        })
        context.commit('updateCartProductsData', response.data.items)
        context.commit('syncCartProducts')
      })()
    },
    deleteCartProduct (context, { basketItemId }) {
      context.commit('deleteCartProduct', { basketItemId });
      (async () => {
        try {
          const response = await axios.delete(`${API_BASE_URL}baskets/products`, {
            data: { basketItemId },
            params: { userAccessKey: context.rootState.userAccessKey }
          })
          context.commit('updateCartProductsData', response.data.items)
        } catch (error) {
          console.log(error)
          context.commit('syncCartProducts')
        }
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
              userAccessKey: context.rootState.userAccessKey
            }
          })
          context.commit('updateCartProductsData', response.data.items)
        } catch (error) {
          console.log(error)
          context.commit('syncCartProducts')
        }
      })()
    }
  }
}
