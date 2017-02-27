<template>
    <div class="columns">
        <div class="column is-3">
            <nav class="panel">
                <p class="panel-heading">Note</p>
                <div class="panel-block">
                    <button class="button is-primary is-outlined is-fullwidth" @click="newNote()">
                        New note
                    </button>
                </div>
                <div class="panel-block">
                    <p class="control has-icon">
                        <input class="input is-small" type="text" placeholder="Search">
                        <span class="icon is-small">
                            <i class="fa fa-search"></i>
                        </span>
                    </p>
                </div>
                <note v-for="note in notes">
                    <a class="panel-block">
                        <span class="panel-icon">
                            <i class="fa fa-file"></i>
                        </span>
                        <a href="#" @click="editNote(note)">{{ note.title }}</a>
                    </a>
                </note>
            </nav>
        </div>
        <div class="column is-9">
            <form method="post" class="form-horizontal" @submit.prevent="doNote" @keydown="errors.clear($event.target.name)">
                <div class="control is-horizontal">
                    <div class="control is-grouped">
                        <p class="control is-expanded">
                            <span class="select is-fullwidth">
                            <select v-model="book">
                                <option v-for="book in books" v-bind:value="book.id">{{ book.book }}</option>
                            </select>
                            </span>
                            <span class="help is-danger" v-if="errors.has('book')" v-text="errors.get_error('book')"></span>
                        </p>

                        <p v-if="id" class="control is-expanded">
                            <a class="button is-danger" :disabled="errors.any()" @click="delNote(id)" >
                                <span class="icon is-small">
                                  <i class="fa fa-trash"></i>
                                </span>
                            </a>
                        </p>

                        <div class="control-label">
                            <label class="label">Tags (separated by a comma)</label>
                        </div>
                        <p class="control is-expanded">
                            <input class="input" name="tags" id="tags" v-model="tags"/>
                            <span class="help is-danger" v-if="errors.has('tags')" v-text="errors.get_error('tags')"></span>
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
    </div>
</template>


<script>
    import { EventBus } from '../core/EventBus.js';
    import Errors from "../core/Errors"
    import marked from 'marked';
    import Note from './Note.vue'
    // import vSelect from "vue-select"

    export default {
        components: { Note },

        data() {
            return {
                id: 0,
                book: 0,
                title: '',
                content: '',
                tags: '',
                notes: [],
                errors: new Errors(),
                books: [],
                thebooks: ''
            };
        },
        computed: {
            compiledMarkdown() {
                return marked(this.content, { sanitize: true })
            }
        },
        methods: {
            doNote(note) {
                if (this.id == 0) {
                    this.addNote();
                } else {
                    this.updateNote(this.note);
                }
            },
            newNote() {
                this.title = '';
                this.content = '';
                this.id = '';
                this.tags = '';
            },
            addNote() {
                axios.post('/api/orotangi/notes/', this.$data)
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
                this.title = note.title;
                this.content = note.content;
                this.id = note.id;
                this.book = note.book;
                if (note.tags && note.tags.length > 0) {
                    this.tags = note.tags;
                }
                else {
                    this.tags = '';
                }
            },
            /* update the note */
            updateNote(note) {
                console.log(this.$data)
                axios.patch('/api/orotangi/notes/' + this.$data.id + '/', this.$data)
                    .then(response => {
                        this.load();
                        this.refresh();
                    })
                    .catch(error => this.errors.record(error.response.data))
            },
            delNote(id) {
                axios.delete('/api/orotangi/notes/' + id + '/')
                    .then(response => {
                        this.notes.splice(this.notes.indexOf(id), 1);
                        this.refresh(response);
                    })
                    .catch(error => { console.log(error); });
            },
            renderContent(text) {
                return marked(text, { sanitize: false });
            },
            refresh(response) {
                this.title = '';
                this.content = '';
                this.id = '';
                this.tags = '';
            },
            getNotes() {
                axios.get('/api/orotangi/notes/')
                    .then(response => {
                        this.notes = response.data;
                    }).catch(error => { console.log(error); })
            },
            load() {
                /* receive an event "to consume" the books from the API only once */
                EventBus.$on('getBooks', (books) => {
                    this.books = books;
                });
                this.getNotes();
            },
        },
        // load data from the API
        mounted() {
            this.load();
        },

    }
</script>
