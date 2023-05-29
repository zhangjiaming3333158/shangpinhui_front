//引入api接口
import {reqgetCategoryList,reqGetBannerList,reqFloorList} from '@/api/index.js'

const state={
  categoryList:[],
  bannerList:[],
  floorList:[],
};
const mutations={
  CategoryList(state,categoryList){
    state.categoryList=categoryList
  },
  GetBannerList(state,bannerList){
    state.bannerList=bannerList
  },
  GetFloorList(state,floorList){
    state.floorList=floorList
  }
};
const actions={
  //通过API接口函数调用，向服务器请求数据
  async categoryList({ commit }){
    let res = await reqgetCategoryList();
    if(res.code == 200){
      commit('CategoryList',res.data)
    }
  },
  //banner信息
  async getBannerList({ commit }){
    let res = await reqGetBannerList();
    if(res.code == 200){
      commit('GetBannerList',res.data)
    }
  },
  async getFloorList({commit}){
    let res = await reqFloorList();
    if(res.code==200){
      commit('GetFloorList',res.data)
    }
  }
};
const getters={};
export default {
  state,
  mutations,
  actions,
  getters
}