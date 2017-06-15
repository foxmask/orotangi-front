<template>
    <div class="books">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Books </h3>
          </div>
          <div class="panel-body">
            <ul class="list-group">
            <book v-for="book in books" :key="book.id">
              <li class="list-group-item"><i class="fa fa-book"></i> <router-link :to="{ name: 'notesbybook', params: {bookName: book.name}}">{{ book.name }}</router-link>&nbsp;<!-- a class="delete" @click="delBook(book.id)"><i class="fa fa-trash"></i></a --></li>
            </book>
            </ul>
            <div v-if="seen">
              <input class="form-control" v-model="name" @keyup.enter="addBook()" type="text" placeholder="enter the book name">
              <span class="help is-danger" v-if="errors.has('name')" v-text="errors.getError('name')"></span>
            </div>
          </div>
          <div class="panel-footer"><button class="btn btn-default" @click="seen = !seen">New book</button></div>
        </div>
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
      errors: new Errors()
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
