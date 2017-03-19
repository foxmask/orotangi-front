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
                            <span class="help is-danger" v-if="errors.has('book')" v-text="errors.get_error('book')"></span>
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
                <span class="help is-danger" v-if="errors.has('title')" v-text="errors.get_error('title')"></span>

                <p class="control">
                    <textarea class="textarea" placeholder="" rows="10" name="content" id="content" v-model="content" debounce="300" :value="content"/>
                </p>
                <p class="control">
                <div v-html="compiledMarkdown"></div>
                </p>
                <span class="help is-danger" v-if="errors.has('content')" v-text="errors.get_error('content')"></span>

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
import { EventBus } from '../core/EventBus.js';
/* errors class */
import Errors from "../core/Errors"
/* markdown */
import marked from 'marked';
/* 'sub' vue */
import Note from './Note.vue'

export default {
    components: { Note },

    data() {
        return {
            id: 0,
            book: 0,
            title: '',
            content: '',
            notes: [],
            errors: new Errors(),
            books: [],
            thebooks: ''
        };
    },
    computed: {
        compiledMarkdown() {
            return marked(this.content, { sanitize: true })
        },
    },
    methods: {
        doNote(note) {
            if (this.id == 0 || this.id == undefined) {
                this.addNote();
            } else {
                this.updateNote(this.$data);
            }
        },
        /* new note button pressed */
        newNote() {
            this.title = '';
            this.content = '';
            this.id = 0;
            this.getBooks()
        },
        /* create a note */
        addNote() {
            let data = this.$data;
            this.axios.post('/api/orotangi/notes/', data)
                .then(response => {
                    this.notes.push({'title': this.title,
                        'content': this.content,
                        'id': response.data.id});
                    this.refresh();
                })
                .catch(error => this.errors.record(error.response.data))
        },
        /* load the note to be modified */
        editNote(note) {
            this.id = note.id;
            this.book = note.book;
            this.title = note.title;
            this.content = note.content;
            this.tags = note.tags;
            this.errors = new Errors();
            this.getBooks()
        },
        /* update the note */
        updateNote(note) {
            let data = note
            this.axios.patch('/api/orotangi/notes/' + note.id + '/', data)
                .then(response => {
                    this.load();
                    this.refresh();
                })
                .catch(error => this.errors.record(error.response.data))
        },
        /* delete action pressed */
        removeNote(note) {
            EventBus.$emit("delNote", note);
            this.refresh();
        },
        /* render text un markdown */
        renderContent(text) {
            return marked(text, { sanitize: false });
        },
        /* clean the form */
        refresh() {
            this.id = 0
            this.title = ''
            this.content = ''
            this.getBooks()
        },
        /* receive an event "to consume" the notes from the API only once */
        getNotes() {
            EventBus.$on('getNotes', (notes) => {
                this.notes = notes;
            });
        },
        /* receive an event "to consume" the books from the API only once */
        getBooks() {
            EventBus.$on('getBooks', (books) => {
                this.books = books;
            })
        },
        load() {
            this.getBooks()
            this.getNotes()
        }
    },
    // load data from the API
    mounted() {
        this.load();
        EventBus.$on('editNote', (note) => { this.editNote(note); })
        EventBus.$on('newNote', () => { this.newNote(); })
    },

}
</script>
