<template>
        <div class="column is-9">
            <form method="post" class="form-horizontal" @submit.prevent="doNote" @keydown="errors.clear($event.target.title)">
                <div class="control is-horizontal">
                    <div class="control is-grouped">
                        <div class="field has-addons">
                            <p class="control is-expanded">
                                <span class="select">
                                <select v-model="book">
                                    <option v-for="book in books" v-bind:value="book.id">{{ book.name }}</option>
                                </select>
                                </span>
                                <span class="help is-danger" v-if="errors.has('book')" v-text="errors.getError('book')"></span>
                            </p>
                            <p class="control">
                                <a v-if="id" class="button is-danger" :disabled="errors.any()" @click="removeNote(id)" >
                                    <span class="icon is-small">
                                      <i class="fa fa-trash"></i>
                                    </span>
                                </a>
                            </p>
                        </div>
                        <div class="field">
                            <p class="control is-expanded">
                                <input placeholder="no title" class="input is-primary is-fullwidth" name="title" id="title" v-model="title"/>
                                <span class="help is-danger" v-if="errors.has('title')" v-text="errors.getError('title')"></span>
                            </p>
                        </div>
                        <div class="field">
                            <ckeditor v-model="content" :config="config"></ckeditor>
                            <span class="help is-danger" v-if="errors.has('content')" v-text="errors.getError('content')"></span>
                        </div>
                        <p class="control is-expanded">
                            <button class="button is-primary" :disabled="errors.any()" >
                                <span class="icon is-small">
                                  <i class="fa fa-save"></i>
                                </span>
                                <span>Save</span>
                            </button>
                        </p>
                    </div>
                </div>
            </form>
        </div>
</template>


<script>
/* to broadcast an event */
import { EventBus } from '../core/EventBus.js'
/* errors class */
import Errors from '../core/Errors'

import Ckeditor from 'vue-ckeditor2'

export default {
  components: { Ckeditor },
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

      config: {
        toolbar: [
          { name: 'document', items: [ 'Source', '-', 'Save', 'Preview', 'Print', '-'  ] },
          { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo' ] },
          { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
          '/',
          { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
          { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
          { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
          { name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'Smiley' ] },
          '/',
          { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
          { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
          { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] }
        ],
        font_names: 'Arial;OpenDyslexic;Comic Sans MS;Courier New;Lucida Sans Unicode;Tahoma;Times New Roman;Trebuchet MS;Verdana;'
      },

      configs: {
        spellChecker: false,
        status: false,
        initialValue: '',
        renderingConfig: {
          codeSyntaxHighlighting: true
          // highlightingTheme: 'atom-one-light',
        },
        autofocus: true,
        autosave: {
          enabled: true,
          uniqueId: 'OroUniqueID',
          delay: 1000
        }
      }
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

<style>
  @font-face {
    font-family: "OpenDyslexic";
    src: local('src/assets/fonts/OpenDyslexicMono-Regular.otf');
  }
  @font-face {
    font-family: "OpenDyslexic";
    font-style: italic;
    src: local('src/assets/fonts/OpenDyslexic-Italic.otf');
  }
  @font-face {
    font-family: "OpenDyslexic";
    font-weight: bold;
    font-style: italic;
    src: local('src/assets/fonts/OpenDyslexic-BoldItalic.otf');
  }
  @font-face {
    font-family: "OpenDyslexic";
    font-weight: bold;
    src: local('src/assets/fonts/OpenDyslexic-Bold.otf');
  }
</style>
