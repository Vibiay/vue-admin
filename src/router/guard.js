import router  from './index';
import {getToKen,removeToKen, removeUserName} from '@/utils/app'
import store from '@/store/index'
const whiteRouter = ['/login']
router.beforeEach((to,from,next)=>{
    console.log(to)
    console.log(from)
    if(getToKen()){
        if(to.path == "/login"){
            removeToKen()
            removeUserName()
            console.log("-----",store)
            store.commit('app/SET_TOKEN','')
            store.commit('app/SET_USERNAME','')
            next()
        }else{
            next()
        }
        
        console.log('token存在')
    }else{
    
        if(whiteRouter.indexOf(to.path) !== -1){
            console.log('白名单存在')
            next()
        }else{
            console.log('跳转到登录页')
            next('/login')
        }
    }
})