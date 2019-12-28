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
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

process.env.NODE_ENV === "production" && Sentry.init({
    dsn: 'https://650a22e14f7348c996aea8ebee1fda2f@sentry.io/1865702',
    integrations: [new Integrations.Vue({
        Vue,
        attachProps: true
    })],
    release: 'test@1.0.2',
    logErrors: true
});
// Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.use(fullscreen)


new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')