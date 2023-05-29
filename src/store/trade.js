import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
  addressInfo: {},
  orderInfo: {},
}
const mutations = {
  GETUSERADDRESS(state, addressInfo) {
    state.addressInfo = addressInfo
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const actions = {
  // 获取用户地址信息
  async getAddressInfo({ commit }) {
    let res = await reqAddressInfo()
    console.log(res)
    if (res.code == 200) {
      commit('GETUSERADDRESS', res.data)
    }
  },
  // 获取订单信息
  async getOrderInfo({ commit }) {
    let res = await reqOrderInfo()
    // console.log(res)
    if (res.code == 200) {
      commit('GETORDERINFO', res.data)
    }
  },
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}
