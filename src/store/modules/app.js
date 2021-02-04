import {Login} from '@/api/login'
import {setToKen , setUserName ,getUserName ,removeToKen,removeUserName} from '@/utils/app'
const state = {
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) ||false,
    to_ken:'',
    username:getUserName() || ''
}
const getters = {
    isCollapse:state => state.isCollapse
}
const mutations = {
    SET_COLLAPSE(state){
        state.isCollapse = !state.isCollapse
        sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state,value){
        state.to_ken = value
    },
    SET_USERNAME(state,value){
        state.username = value
    }
}
const actions = {
    login({commit},data){
        return new Promise((resolve,reject)=>{
            // 接口 
            Login(data).then(res=>{
                // 解构
                commit('SET_TOKEN',res.data.data.token)
                commit('SET_USERNAME',res.data.data.username)
                setToKen(res.data.data.token)
                setUserName(res.data.data.username)
                resolve(res)
            }).catch(err=>{
                reject(err)
            })

        })
    },
    exit({commit}){
        return new Promise((resolve,reject)=>{
            removeToKen()
            removeUserName()
            commit('SET_TOKEN','')
            commit('SET_USERNAME','')
            resolve()
        })
    }
}



export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}