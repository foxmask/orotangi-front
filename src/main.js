// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// https://github.com/mzabriskie/axios
import axios from 'axios'
// https://github.com/imcvampire/vue-axios
import VueAxios from 'vue-axios'
// https://github.com/vuejs/vue-router/
import VueRouter from 'vue-router'

import App from './App.vue'

// get the SERVER_URL of prod or dev environment
axios.defaults.baseURL = process.env.SERVER_URL

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

// Vue.config.productionTip = false

// window.axios = axios;
window.Cookies = require('js-cookie')

var csrftoken = Cookies.get('csrftoken')

axios.defaults.headers.common['cookiename'] = 'csrftoken'
axios.defaults.headers.common['X-CSRFToken'] = csrftoken
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'

var EventBus = new Vue()

import Books from '@/components/Books'
import Notes from '@/components/Notes'

const routes = [
  { path: '/books', component: Books, name: 'books'},
  { path: '/notes', component: Notes, name: 'notes'},
  { path: '/book/:bookName/notes', component: Notes, name: 'notesbybook', props: true }
]

const router = new VueRouter({
  routes // short for routes: routes
})

new Vue({
  router,
  el: '#root',
  render: h => h(App)
})
