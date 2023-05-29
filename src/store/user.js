import { reqGetCode, reqUserRegister ,reqUserLogin,reqGetUserInfo,reqLogout } from '@/api'
import { setToken,getToken, removeToken } from '@/utils/token'

const state = {
  code: '',
  token:getToken(),
  userInfo:{}
}
const mutations = {
  RECEIVE_CODE(state, code) {
    state.code = code
  },
  RECEIVE_TOKEN(state,token){
    state.token = token
  },
  RECEIVE_USERINFO(state,userInfo){
    state.userInfo = userInfo
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let res = await reqGetCode(phone)
    if (res.code == 200) {
      commit('RECEIVE_CODE', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 注册
  async userRegister({commit},data){
    let res = await reqUserRegister(data)
    if(res.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },
  // 登录
  async userLogin({commit},data){
    let res = await reqUserLogin(data)
    if(res.code == 200){
      commit('RECEIVE_TOKEN',res.data.token)
      setToken(res.data.token);
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}){
    let res = await reqGetUserInfo()
    if(res.code == 200){
      commit('RECEIVE_USERINFO',res.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },
  async Logout({commit}){ //退出登录
    let res = await reqLogout()
    if(res.code==200){
      commit('RECEIVE_TOKEN','')
      commit('RECEIVE_USERINFO',{})
      removeToken()
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
}
