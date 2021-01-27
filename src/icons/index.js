import Vue from 'vue'
import SvgIcon from './SvgIcon'
// 自定义icon组件
Vue.component('svg-icon',SvgIcon)

const req = require.context('./svg',false,/\.svg$/)

const requireAll = (requireContext) =>{
    return requireContext.keys().map(requireContext)
}

requireAll(req)
