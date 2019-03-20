import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/index.scss' 
import './icons'

import './permission' // permission control

Vue.config.productionTip = false
Vue.use(ElementUI);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')