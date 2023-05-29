import { reqCartList, reqDeleteCart, reqUpdateCheckedByid } from '@/api'

const state = {
  cartList: [],
}
const mutations = {
  GETCARTLIST(state, data) {
    state.cartList = data
  },
}
const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  async deleteCart({ commit }, skuId) {
    let result = await reqDeleteCart(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    //获取购物车中全部的产品（是一个数组）
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      //将每一次返回的Promise添加到数组当中
      PromiseAll.push(promise)
    })
    //只要全部的p1|p2....都成功，返回结果即为成功
    //如果有一个失败，返回即为失败结果
    return Promise.all(PromiseAll)
  },
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('updateCheckedById', {
        skuId: item.skuId,
        isChecked,
      })
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  },
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
