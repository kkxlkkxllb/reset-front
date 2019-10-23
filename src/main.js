import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast'
import NProgress from 'muse-ui-progress'
import Message from 'muse-ui-message'
import Loading from 'muse-ui-loading'
import theme from 'muse-ui/lib/theme'
import 'muse-ui/dist/muse-ui.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'muse-ui-progress/dist/muse-ui-progress.css'
import 'muse-ui-message/dist/muse-ui-message.css'
import 'muse-ui-loading/dist/muse-ui-loading.css'
import zh from './i18n/zh'
import en from './i18n/en'

Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(VueI18n)
Vue.use(Message)
Vue.use(Loading)
Vue.use(NProgress, {
  color: '#DCE5FD',
  size: 5
})
Vue.use(VueLazyload, {
  attempt: 2
})
Vue.use(Toast, {
  position: 'top',
  time: 4000
})
Vue.use(VueAxios, axios)
theme.use('light')
axios.defaults.baseURL = '/api'

const i18n = new VueI18n({
  locale: store.getters.lang,
  messages: {
    zh,
    en
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
