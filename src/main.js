import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'

window.axios = axios;
window.Cookies = require('js-cookie');

var csrftoken = Cookies.get('csrftoken');
axios.defaults.headers.common['cookiename'] = 'csrftoken';
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'

new Vue({
  el: '#root',
  render: h => h(App)
});


