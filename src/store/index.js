import Vue from 'vue'
import Vuex from 'vuex'
import {Login} from '@/api/login'
Vue.use(Vuex)
import app from './modules/app'

export default new Vuex.Store({
  state: {
    // isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) ||false
  },
  getters:{

  },
  mutations: {
    // SET_COLLAPSE(state){
    //   state.isCollapse = !state.isCollapse
    //   sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    // }
  },
  actions: {
    login(context,data){
      return new Promise((resolve,reject)=>{
        // 接口 
        Login(data).then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })

      })
    }
  },
  modules: {
    app
  }
})
