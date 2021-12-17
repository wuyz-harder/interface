import Vue from 'vue'
import VueRouter from 'vue-router'
import project from '../components/project.vue'
import people from '../components/people.vue'
import log from "../components/log.vue"
import login from "../components/login.vue"
import navigator from "../components/navigator.vue"
import interface_list from "../components/interface.vue"
import wstest from "../components/wstest.vue"
import upload from "../components/common/upload.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/project",
    name: 'navigator',
    component: navigator,
    children:[
      {
      path: '/project',
      name: 'project',
      component: project
  
    },
    {
      path: '/people',
      name: 'people',
      component: people
  
    },
    {
      path: '/log',
      name: 'log',
      component: log
  
    },
    {
      path: '/interface',
      name: 'interface',
      component: interface_list
  
    },
    {
      path: '/websocket',
      name: 'wstest',
      component: wstest
  
    }
  ]
  },
  {
    path: '/login',
    name: 'login',
    component: login

  },
  {
    path: '/upload',
    name: 'upload',
    component: upload

  }
]

const router = new VueRouter({
  routes
})
export default router
