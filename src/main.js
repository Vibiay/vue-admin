import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
