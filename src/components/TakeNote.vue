<template>
    <div class="new_note">
        <h3>Take a note</h3>
        <form method="post" class="form-horizontal" @submit.prevent="addNote" @keydown="errors.clear($event.target.name)">

		<div class="form-group">
			<label for="id_title" class="col-sm-2 control-label">Title</label>
			<div class="col-sm-6">
			    <input name="title" id="title" v-model="title"/>
			</div>
            <span class="col-sm-offset-1 col-sm-10" role="alert" v-if="errors.has('title')" v-text="errors.get_error('title')"></span>
		</div>

		<div class="form-group">
			<label for="id_content" class="col-sm-2 control-label">Content</label>
			<div class="col-sm-6">
			    <textarea name="content" id="content" v-model="content"
			    debounce="300" :value="content"/>
			    <div v-html="compiledMarkdown"></div>
			</div>
            <span class="col-sm-offset-1 col-sm-10" role="alert" v-if="errors.has('content')" v-text="errors.get_error('content')"></span>
		</div>

		<div class="form-group form-actions">
			<div class="col-sm-offset-2 col-sm-4">
			    <button class="btn btn-primary" :disabled="errors.any()">Save</button>
            </div>

        </form>
    </div>
</template>


<script>
import Errors from "../core/Errors"
import marked from 'marked';

export default {
    data() {
        return {
            book: 1,
            user: 1,
            title: '',
            content: '',
            errors: new Errors()
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
        /*update: _.debounce(function (e) {
          this.input = e.target.value
        }, 300),*/
        refresh(response) {
            this.title = '';
            this.content = '';
        }
    }
}
</script>
