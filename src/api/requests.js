//对于axios进行二次封装
import axios from "axios"
//引入进度条样式
import nprogress from "nprogress";
//在当前模块中引入store
import store from '@/store';
//如果出现进度条没有显示：一定是你忘记了引入样式了
import "nprogress/nprogress.css";

const requests = axios.create({
  //基础路径
  baseURL: '/api'
  //请求不能超过5S
  // timeout: 5000,
})

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
  if(store.state.detail.uuid_token){
    //请求头添加一个字段(userTempId):和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  //需要携带token带给服务器
  if(store.state.user.token){
    config.headers.token = store.state.user.token;
  }
  //现在的问题是config是什么?配置对象
  //可以让进度条开始动
  nprogress.start();
  return config;
});

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
  (res) => {
    //进度条结束
    nprogress.done();
    //相应成功做的事情
    return res.data;
  },
  (err) => {
    console.log("服务器响应数据失败");
  }
);

export default requests