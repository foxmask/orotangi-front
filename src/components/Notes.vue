<template>
    <div class="notes">
    <h1 class="title">My notes</h1>
    <div>
        <note v-for="note in notes">
            <header>{{ note.title }}</header>
            <div v-html="render(note.content)"></div>
            <footer><span v-for="tag in note.tags">{{ tag.tag }}</span></footer>
            <button @click="delNote(note)">delete</button>
            <hr/>
        </note>
    </div>
</template>

<script>
import marked from 'marked'
import Note from './Note.vue'

export default {
    data() {
        return {
            notes: []
        }
    },
    filters: {
        marked: marked
    },
    components: { Note },
    methods: {
        delNote(note) {
            axios.delete('/api/orotangi/notes/'
                .concat(note.id) + '/'
                ).catch((error) => {
                    console.log(error);
                });
            this.notes.splice(this.notes.indexOf(note), 1);

        },
        render(text) {
            return marked(text, { sanitize: false });
        }
    },
    mounted() {
        axios.get('/api/orotangi/notes/')
            .then(response => {
                this.notes = response.data;
            }).catch(error => {
                console.log(error);
            })
    }
}
</script>
