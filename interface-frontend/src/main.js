import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import {Message} from 'element-ui'
import axios from "axios"
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

axios.interceptors.request.use(request=>{
  
  request.headers.token = sessionStorage.getItem("token")?sessionStorage.getItem("token"):""
  return request
},err=>{
  console.log("网络出错！")
  return err
})

axios.interceptors.response.use(res=>{
    if(res.data.code == 401){
        
        Message.error("请先登录")
        router.push("/login")
        return res
    }else{
    return res
    }
},err=>{
  console.log(err)
  return err
})
Vue.use(ElementUI)
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
