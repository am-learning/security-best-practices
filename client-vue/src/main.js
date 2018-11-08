// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import connection from '@/helpers/connect'
import 'bootstrap'
import 'jquery-ui-dist/jquery-ui'
import BootstrapVue from "bootstrap-vue"
import moment from 'moment'
import Toastr from 'vue-toastr'
import ElementUI from 'element-ui'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import 'vue-toastr/dist/vue-toastr.css'
import '@/assets/css/style.css'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(Toastr)
Vue.use(BootstrapVue)

Vue.prototype.$moment = moment
Vue.prototype.$server = connection

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
