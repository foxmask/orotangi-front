<template>
	<div>
		<div class="col-xs-4 col-md-4 col-lg-4">
		<h3>My notes</h3>
		<note v-for="note in notes">
			<header>{{ note.title }}</header>
			<p v-if="note.tags.length > 0" ><span class="glyphicon glyphicon-tag" v-for="tag in note.tags"> {{ tag.tag }} </span></p>
			<hr/>
		</note>
		</div>
		<div class="col-xs-5 col-md-5 col-lg-5">
        <h3>Take a note</h3>
        <form method="post" class="form-horizontal" @submit.prevent="addNote" @keydown="errors.clear($event.target.name)">

		<div class="form-group">
			<div class="col-sm-12">
			    <input placeholder="Title" class="form-control" name="title" id="title" v-model="title"/>
			</div>
            <span class="col-sm-12" role="alert" v-if="errors.has('title')" v-text="errors.get_error('title')"></span>
		</div>

		<div class="form-group">
			<div class="col-sm-12">
			    <textarea placeholder="Text" class="form-control" rows="30" name="content" id="content" v-model="content" debounce="300" :value="content"/>
			    <div v-html="compiledMarkdown"></div>
			</div>
            <span class="col-sm-12" role="alert" v-if="errors.has('content')" v-text="errors.get_error('content')"></span>
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
            book: 1,
            user: 1,
            title: '',
            content: '',
            errors: new Errors(),
            notes: []
        };
    },
    computed: {
        compiledMarkdown() {
            return marked(this.content, { sanitize: true })
        }
    },
	methods: {
        addNote() {
            axios.post('http://127.0.0.1:8000/api/orotangi/notes/', this.$data)
                 .then(this.refresh)
                 .catch(error => this.errors.record(error.response.data))
        },
        refresh(response) {
            // add the data to the stack
            this.notes.push({'title': this.title, 'content': this.content});
            // then empty the fields
            this.title = '';
            this.content = '';
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
    },
	// load data from the API
    mounted() {
        axios.get('http://127.0.0.1:8000/api/orotangi/notes/')
             .then(response => {
            	this.notes = response.data;
     	   }).catch(error => {
     	       console.log(error);
           })
    }
}
</script>
