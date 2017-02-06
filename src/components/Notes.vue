<template>
    <div class="notes">
	<h3>My notes</h3>
    <div>
        <note v-for="note in notes">
            <header>{{ note.title }}</header>
            <div>{{ note.content }}</div>
            <footer><span v-for="tag in note.tags">{{ tag.tag }}</span></footer>
            <hr/>
        </note>
    </div>
</template>

<script>
import axios from 'axios'
import Note from './Note.vue'

export default {
	data() {
		return {
			notes: []
		}
	},
    components: { Note },
	methods: {
        addNote: function() {
            var newNote = {
                book: this.apps.books,
                title: this.note.title.trim(),
                content: this.note.content.trim()
            };
            axios.post('http://127.0.0.1:8000/api/orotangi/notes/', newNote)
        },
        delNote: function(note) {
            axios.delete('http://127.0.0.1:8000/api/orotangi/notes/'
				.concat(note.id));
            this.notes.splice(this.notes.indexOf(note), 1);
        }
	},
    mounted: function() {
        axios.get('http://127.0.0.1:8000/api/orotangi/notes/')
			.then(response => {
				this.notes = response.data;
            }).catch((error) => {
                console.log(error);
            });
	}
}
</script>