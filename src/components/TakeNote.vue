<template>
        <div class="column is-9">
            <form method="post" class="form-horizontal" @submit.prevent="doNote" @keydown="errors.clear($event.target.name)">
                <div class="control is-horizontal">
                    <div class="control is-grouped">
                        <p class="control is-expanded">
                            <span class="select is-fullwidth">
                            <select v-model="book">
                                <option v-for="book in books" v-bind:value="book.id">{{ book.name }}</option>
                            </select>
                            </span>
                            <span class="help is-danger" v-if="errors.has('book')" v-text="errors.getError('book')"></span>
                        </p>

                        <p v-if="id" class="control is-expanded">
                            <a class="button is-danger" :disabled="errors.any()" @click="removeNote(id)" >
                                <span class="icon is-small">
                                  <i class="fa fa-trash"></i>
                                </span>
                            </a>
                        </p>
                    </div>
                </div>

                <p class="control">
                    <input placeholder="no title" class="input" name="title" id="title" v-model="title"/>
                </p>
                <span class="help is-danger" v-if="errors.has('title')" v-text="errors.getError('title')"></span>

                <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
                <span class="help is-danger" v-if="errors.has('content')" v-text="errors.getError('content')"></span>

                <p class="control">
                    <button class="button is-primary" :disabled="errors.any()" >
                        <span class="icon is-small">
                          <i class="fa fa-save"></i>
                        </span>
                        <span>Save</span>
                    </button>
                </p>

            </form>
        </div>

</template>


<script>
/* to broadcast an event */
import { EventBus } from '../core/EventBus.js'
/* errors class */
import Errors from '../core/Errors'
/* markdown */
import { markdownEditor } from 'vue-simplemde'

export default {
  components: { markdownEditor },
  data () {
    return {
      id: 0,
      book: 0,
      title: '',
      content: '',
      notes: [],
      errors: new Errors(),
      books: [],
      thebooks: '',
      configs: {
        status: false,
        initialValue: '',
        renderingConfig: {
          codeSyntaxHighlighting: true,
          highlightingTheme: 'atom-one-light'
        }
      }
    }
  },
  computed: {
    simplemde () {
      return this.$refs.markdownEditor.simplemde
    }
  },
  methods: {
    doNote () {
      if (this.id === 0 || this.id === undefined) {
        this.addNote()
      } else {
        this.updateNote(this.$data)
      }
    },
    /* new note button pressed */
    newNote () {
      this.title = ''
      this.content = ''
      this.id = 0
      this.getBooks()
    },
    /* create a note */
    addNote () {
      this.axios.post('/api/orotangi/notes/', this.$data)
        .then(response => {
          this.notes.push({'title': this.title,
            'content': this.content,
            'id': response.data.id})
          this.refresh()
        })
        .catch(error => this.errors.record(error.response.data))
    },
    /* load the note to be modified */
    editNote (note) {
      this.id = note.id
      this.book = note.book
      this.title = note.title
      this.content = note.content
      this.tags = note.tags
      this.errors = new Errors()
      this.getBooks()
    },
    /* update the note */
    updateNote (note) {
      this.axios.patch('/api/orotangi/notes/' + note.id + '/', note)
        .then(response => {
          this.load()
          this.refresh()
        })
        .catch(error => this.errors.record(error.response.data))
    },
    /* delete action pressed */
    removeNote (note) {
      EventBus.$emit('delNote', note)
      this.refresh()
    },
    /* clean the form */
    refresh () {
      this.id = 0
      this.title = ''
      this.content = ''
      this.getBooks()
    },
    /* receive an event "to consume" the notes from the API only once */
    getNotes () {
      EventBus.$on('getNotes', (notes) => {
        this.notes = notes
      })
    },
    /* receive an event "to consume" the books from the API only once */
    getBooks () {
      EventBus.$on('getBooks', (books) => {
        this.books = books
      })
    },
    load () {
      this.getBooks()
      this.getNotes()
    }
  },
  // load data from the API
  mounted () {
    this.load()
    EventBus.$on('editNote', (note) => { this.editNote(note) })
    EventBus.$on('newNote', () => { this.newNote() })
  }
}
</script>
