import Vue from 'vue'
import axios from 'axios'
// import App from './App.vue'
import Books from './components/Books.vue'
import Tags from './components/Tags.vue'
import Notes from './components/Notes.vue'
import TakeNote from './components/TakeNote.vue'

window.axios = axios;

//var csrftoken = Cookies.get('csrftoken');
//axios.defaults.headers.common['cookiename'] = 'csrftoken'
//axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"

new Vue({
  el: '#root',
  components: { Books, Tags, Notes, TakeNote},
});
