import axios from 'axios'
import { Message } from 'element-ui';

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api'
console.log(BASEURL)
const service = axios.create({
    baseURL:BASEURL,
    timtout:15000
})

// 添加拦截器
service.interceptors.request.use(function(config){
    // 在发送请求之前做些什么
    // if(config.url != '/login'){
    //     // config.headers['X-Token'] = localStorage.getItem('token')
    // }
    return config;
},function(error){
    // return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response){
    // 对数据做点什么
    let data = response.data
    if(data.resCode !== 0 ){
        Message.error(data.message)
        return Promise.reject(data)
    }else{
        return response
    }
    
},function(error){
    return Promise.reject(error)
})

export default service;