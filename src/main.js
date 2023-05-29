import Vue from 'vue'
import App from './App.vue'
//导入router
import router from '@/router'
//导入store
import store from '@/store/'
//导入mock
import '@/mock/mockServe.js'
//导入swiper
import "swiper/css/swiper.min.css";
//导入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入api
import * as API from '@/api'
//导入组件
import TypeNav from '@/components/typenav/TypeNav.vue'
import Pagina  from '@/components/pagination/Pagina.vue'
//导入vue-lazyload
import VueLazyload from 'vue-lazyload'
//引入validate
import '@/plugins/validate.js'
// 注册为全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagina.name,Pagina)

Vue.config.productionTip = false

Vue.use(ElementUI);
const loadimage = require('@/assets/logo.png')
Vue.use(VueLazyload, {
  loading: loadimage,
})

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,//挂载
  store
}).$mount('#app')
