import Vue from 'vue'
// import App from './App.vue'
import Books from './components/Books.vue'
import Tags from './components/Tags.vue'
import Notes from './components/Notes.vue'
import TakeNote from './components/TakeNote.vue'
//  import axios from 'axios'
//var csrftoken = Cookies.get('csrftoken');
//axios.defaults.headers.common['cookiename'] = 'csrftoken'
//axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"

new Vue({
  el: '#root',
  components: { Books, Tags, Notes, TakeNote},
  computed: {
      compiledMarkdown: function () {
          return marked(this.input, { sanitize: true })
      }
    }
});
