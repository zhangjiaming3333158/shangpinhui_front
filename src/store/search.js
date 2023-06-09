import { reqGetSearchList } from '@/api'
const state = {
  searchList: {},
}
const mutations = {
  GetSearchList(state, searchList) {
    state.searchList = searchList
  },
}
const actions = {
  async getSearchList({ commit }, params = {}) {
    let res = await reqGetSearchList(params)
    if (res.code == 200) {
      commit('GetSearchList', res.data)
    }
  },
}
const getters = {
  //当前形参state，当前仓库中的state，并非大仓库中的那个state
  goodsList(state) {
    //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
    //假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
    //计算新的属性的属性值至少给人家来一个数组
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
