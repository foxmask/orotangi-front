<template>
	<div>
		<div class="col-xs-3 col-md-3 col-lg-3">
			<h3>My notes</h3>
			<note v-for="note in notes">
                <header><a href="#" @click="editNote(note)">{{ note.title }}</a></header>
				<!--p v-if="note.tags.length > 0" ><span class="glyphicon glyphicon-tag" v-for="tag in note.tags"> {{ tag.tag }} </span></p-->
				<hr/>
			</note>
		</div>
		<div class="col-xs-8 col-md-8 col-lg-8">
			<h3>Take a note</h3>
			<form method="post" class="form-horizontal" @submit.prevent="doNote" @keydown="errors.clear($event.target.name)">

			<div class="form-group">
				<div class="col-sm-5">
					<input placeholder="Title" class="form-control" name="title" id="title" v-model="title"/>
				</div>
				<span class="col-sm-5" role="alert" v-if="errors.has('title')" v-text="errors.get_error('title')"></span>
			</div>

			<div class="form-group">
				<div class="col-sm-5">
					<textarea placeholder="Text" class="form-control" rows="10" name="content" id="content" v-model="content" debounce="300" :value="content"/>
				</div>
				<div class="col-sm-3">
					<div v-html="compiledMarkdown"></div>
				</div>
				<span class="col-sm-3" role="alert" v-if="errors.has('content')" v-text="errors.get_error('content')"></span>
			</div>

			<div class="form-group form-actions">
				<div class="col-sm-12">
					<button class="btn btn-primary" :disabled="errors.any()" >
						<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
					</button>
				</div>
			</div>

			</form>
		</div>
    </div>
</template>


<script>
import Errors from "../core/Errors"
import marked from 'marked';
import Note from './Note.vue'

export default {
    components: { Note },

    data() {
        return {
            id: 0,
            book: 1,
            user: 1,
            title: '',
            content: '',
            notes: [],
            errors: new Errors(),
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
        addNote() {
            axios.post('http://127.0.0.1:8000/api/orotangi/notes/', this.$data)
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
            axios.get('http://127.0.0.1:8000/api/orotangi/notes/' + note.id + '/')
                 .then(response => {
                    this.note = response.data;
                    this.title = response.data.title;
                    this.content = response.data.content;
                    this.tags = response.data.tags;
                     this.id = note.id;
               }).catch(error => {
                   console.log(error);
               })
		},
		/* update the note */
		updateNote(note) {
		    console.log(axios.defaults.headers.common['cookiename']);
		    console.log(axios.defaults.headers.common['X-CSRFToken']);
            axios.patch('http://127.0.0.1:8000/api/orotangi/notes/' + note.id + '/', this.$data)
                 .then(response => {
                    this.load();
                    this.refresh();
               	})
                 .catch(error => this.errors.record(error.response.data))
		},
        delNote(note) {
            axios.delete('http://127.0.0.1:8000/api/orotangi/notes/' + note.id + '/')
                .catch(error => {
                    console.log(error);
                });
            this.notes.splice(this.notes.indexOf(note), 1);

        },
		render(text) {
			return marked(text, { sanitize: false });
		},
        refresh(response) {
            // then empty the fields
            this.title = '';
            this.content = '';
            this.id = '';
        },
        load() {
            axios.get('http://127.0.0.1:8000/api/orotangi/notes/')
                 .then(response => {
                    this.notes = response.data;
               }).catch(error => {
                   console.log(error);
               })
        }
    },
	// load data from the API
    mounted() {
        this.load();
    },

}
</script>
