import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'

window.axios = axios;

//var csrftoken = Cookies.get('csrftoken');
//axios.defaults.headers.common['cookiename'] = 'csrftoken'
//axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"

new Vue({
  el: '#root',
  render: h => h(App)
});
