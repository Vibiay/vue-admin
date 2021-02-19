import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api' 
import './icons'
import './router/guard'
import globals from "@/utils/global"
Vue.use(ElementUI)
Vue.use(VueCompositionApi)
Vue.use(globals)
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
