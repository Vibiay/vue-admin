const state = {
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) ||false
}
const getters = {
    isCollapse:state => state.isCollapse
}
const mutations = {
    SET_COLLAPSE(state){
        state.isCollapse = !state.isCollapse
        sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    }
}
const actions = {
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
}



export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}