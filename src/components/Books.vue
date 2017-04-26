<template>
    <div class="books">
        <nav class="panel">
            <p class="panel-heading">
                <span class="panel-icon"><i class="fa fa-book"></i></span> Books
            </p>
            <div class="panel-block">
              <button class="button is-primary is-outlined is-fullwidth" @click="seen = !seen">
                New book
              </button>
            </div>
            <div v-if="seen" class="panel-block">
                <p class="control has-icon">
                  <input class="input is-small" v-model="name" @keyup.enter="addBook()" type="text" placeholder="">
                  <span class="help is-danger" v-if="errors.has('name')" v-text="errors.getError('name')"></span>
                  <span class="icon is-small">
                    <i class="fa fa-book"></i>
                  </span>
                </p>
            </div>
            <book v-for="book in books" :key="book.id">
              <router-link :to="{ name: 'notesbybook', params: {bookName: book.name}}">{{ book.name }}</router-link>
              &nbsp;<a class="delete" @click="delBook(book.id)"></a>
            </book>
        </nav>
    </div>
</template>

<script>
/* to broadcast an event */
import { EventBus } from '../core/EventBus.js'
/* errors class */
import Errors from '../core/Errors'

import Book from './Book.vue'

export default {
  data () {
    return {
      name: '',
      seen: false,
      books: [],
      errors: new Errors(),
    }
  },
  components: { Book },
  methods: {
    /* create a book */
    addBook () {
      this.axios.post('/api/orotangi/books/', this.$data)
        .then(response => {
          this.books.push({'name': this.name,
                           'id': response.data.id})
          this.refresh()
        })
        .catch(error => this.errors.record(error.response.data))
    },
    /* delete action pressed */
    delBook (id) {
      this.axios.delete('/api/orotangi/books/' + id + '/'
      ).catch((error) => {
        console.log(error)
      })
      this.books.splice(this.books.indexOf(id), 1)
      this.refresh()
    },
    refresh () {
      EventBus.$emit('getBooks', this.books)
      this.seen = false
      this.name = ''
    }
  },
  mounted () {
    /* get the books */
    this.axios.get('/api/orotangi/books/')
      .then(res => {
        this.books = res.data.results
        /* emit an event to provide the books from the API only once */
        EventBus.$emit('getBooks', this.books)
      }).catch(error => {
        console.log(error)
      })
  }
}
</script>
