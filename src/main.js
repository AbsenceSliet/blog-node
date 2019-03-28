import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '@/style/index.scss'
import fullscreen from 'vue-fullscreen'

import './permission' // permission control
import '@/icons'
import i18n from './i18n'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.use(fullscreen)


new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')