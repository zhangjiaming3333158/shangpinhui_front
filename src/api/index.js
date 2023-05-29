//统一管理项目接口的模块
import requests from '@/api/requests.js'

import mockRequests from "./mockAjax";

//三级菜单的请求地址  /api/product/getBaseCategoryList   GET    没有任何参数
//对外暴露一个函数，只要外部调用这个函数，就想服务器发起ajax请求、获取咱们的三级菜单数据。当前咱们这个函数只需要把服务器返回结果返回即可。

export const reqgetCategoryList = () =>requests.get(`/product/getBaseCategoryList`);  //简略写法
// export const reqgetCategoryList = () => {                                          //正常写法 
//   return  requests.get(`/product/getBaseCategoryList`)
// }

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get("/banner");

//获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");

export const reqGetSearchList = (params) => requests({url:'/list',method:'post',data:params})

//获取商品详情
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

//购物车添加
export const reqAddToCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

//获取购物车列表数据接口
//URL:/api/cart/cartList   method:get 
export const reqCartList = ()=>requests({url:'/cart/cartList ',method:'get'});

//删除购物车数据接口
export const reqDeleteCart = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get 
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

//获取验证码
//URL:/api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

//注册
//url:/api/user/passport/register  method:post    phone code password
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'});

//登录
//url:/api/user/passport/login  method:post    phone password
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'});

//获取用户信息
//url:/api/user/passport/auth/getUserInfo  method:get
export const reqGetUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

//退出登录
//url:/api/user/passport/logout  method:get
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'});

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});

//提交订单
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}   method:post
export const reqSubmitOrder = (tradeNo,tradeInfo)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data:tradeInfo,method:'post'});

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}   method:get
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export  const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});