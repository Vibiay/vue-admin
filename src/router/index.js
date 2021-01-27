import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import './guard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'login',
    hidden:true,
    meta:{
      name:'主页'
    }
  },
  {
    path:'/login',
    name:'login',
    hidden:true,
    meta:{
      name:'登录'
    },
    component:Login
  },
  {
    path:'/console',
    name:'Console',
    meta:{name:'控制页',icon:'console'},
    redirect:'index',
    component: Layout,
    children:[
      {
        path:'/index',
        name:'Index',
        meta:{
          name:'首页'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Console/index.vue'),
      }
    ]
  },
  {
    path:'/info',
    name:'Info',
    meta:{name:'信息管理',icon:'info'},
    component: Layout,
    children:[
      {
        path:'/infoIndex',
        name:'InfoIndex',
        meta:{
          name:'信息列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Info/index.vue'),
      },
      {
        path:'/infoCatgory',
        name:'InfoCatgory',
        meta:{
          name:'信息分类'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Info/catgory.vue'),
      }
    ]
  },
  // 用户管理
  {
    path:'/user',
    name:'User',
    meta:{name:'用户管理',icon:'user'},
    component: Layout,
    children:[
      {
        path:'/userIndex',
        name:'UserIndex',
        meta:{
          name:'用户列表'
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/User/index.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
