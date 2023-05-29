//导入
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用
Vue.use(VueRouter)

import store from '@/store'

//导入组件
// import Home from '@/views/home/Home.vue'
// import Login from '@/views/login/Login.vue'
// import Register from '@/views/register/Register.vue'
// import Search from '@/views/search/Search.vue'
// import Detail from '@/views/detail/Detail.vue'
// import AddCarSuccess from '@/views/addcarsuccess/AddCarSuccess.vue'
// import ShopCart from '@/views/shopcart/ShopCart.vue'
// import Trade from '@/views/trade/Trade.vue'
// import Pay from '@/views/pay/Pay.vue'
// import PaySucess from '@/views/paysuccess/PaySucess.vue'
// import Center from '@/views/center/Center.vue'
// import MyOrder from '@/views/center/children/MyOrder.vue'
// import GroupOrder from '@/views/center/children/GroupOrder.vue'

//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject)
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

//创建路由对象
let router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: ()=>import('@/views/home/Home.vue'),
      meta: { show: true },
    },
    {
      path: '/center',
      component: ()=>import('@/views/center/Center.vue'),
      meta: { show: true },
      children: [
        {
          path: 'myorder',
          component: () => import('@/views/center/children/MyOrder.vue'),
        },
        {
          path: 'grouporder',
          component: () => import('@/views/center/children/GroupOrder.vue'),
        },
        {
          path: '',
          redirect: 'myorder',
        },
      ],
    },
    {
      path: '/pay',
      component: () => import('@/views/pay/Pay.vue'),
      // 将query参数映射成props传递给路由组件
      props: (route) => ({ orderId: route.query.orderId }),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        //如果没有登陆，跳转到登录页面
        if (from.path == '/trade') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/paysuccess',
      component: () => import('@/views/paysuccess/PaySucess.vue'),
      // 将query参数映射成props传递给路由组件
      props: (route) => ({ orderId: route.query.orderId }),
      meta: { show: true },
    },
    {
      path: '/trade',
      name: 'Trade',
      component: () => import('@/views/trade/Trade.vue'),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        //如果没有登陆，跳转到登录页面
        if (from.path == '/shopcart' || from.path == '/detail') {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: '/addcarsuccess',
      name: 'addcarsuccess',
      component: () => import('@/views/addcarsuccess/AddCarSuccess.vue'),
      meta: { show: true },
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: () => import('@/views/shopcart/ShopCart.vue'),
      meta: { show: true },
    },
    {
      //结尾加？表示params可传可不传
      path: '/search/:keyword?',
      component: () => import('@/views/search/Search.vue'),
      meta: { show: true },
      name: 'search',
    },
    {
      name: 'detail',
      path: '/detail/:skuId',
      component: () => import('@/views/detail/Detail.vue'),
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue'),
      meta: { show: false },
    },
    {
      path: '/register',
      component: () => import('@/views/register/Register.vue'),
      meta: { show: false },
    },
    {
      path: '/',
      component: () => import('@/views/home/Home.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    //返回的这个y=0，代表的滚动条在最上方
    return { y: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  //to:要去的路由配置对象
  //from:来自哪个路由配置对象
  //next:放行的标记
  next()
  // let token = store.state.user.token
  // let name = store.state.user.userInfo.name
  // //如果要去的是登录或者注册，直接放行
  // if (token) {
  //   if (to.path == '/login' || to.path == '/register' || to.path== '/home') {
  //     next(false)
  //   } else {
  //     //已经登陆了,访问的是非登录与注册
  //     //登录了且拥有用户信息放行
  //     if (name) {
  //       next()
  //     } else {
  //       //登陆了且没有用户信息
  //       //在路由跳转之前获取用户信息且放行
  //       try {
  //         await store.dispatch('getUserInfo')
  //         next()
  //       } catch (error) {
  //         //token失效从新登录
  //         await store.dispatch('userLogout')
  //         next('/login')
  //       }
  //     }
  //   }
  // } else {
  //   let toPath = to.path;
  //   if (to.path == '/login' || to.path == '/register' || to.path== '/home' || to.path== '/search') {
  //     next()
  //   } else {
  //     next('/login?redirect='+toPath)
  //   }
  // }
})

export default router
