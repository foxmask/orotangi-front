<template>
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
            <note v-for="note in notes" :key="note.id">
                <a class="panel-block">
                    <span class="panel-icon">
                        <i class="fa fa-file"></i>
                    </span>
                    <a href="#" @click="editNote(note)">{{ note.title }}</a>
                </a>
            </note>
        </nav>
    </div>
</template>

<script>
/* to broadcast an event */
import { EventBus } from '../core/EventBus.js'
// note content
import Note from './Note.vue'

export default {
  data () {
    return {
      notes: []
    }
  },
  components: { Note },
  methods: {
    delNote (id) {
      this.axios.delete('/api/orotangi/notes/' + id + '/'
        ).catch((error) => {
          console.log(error)
        })
      this.notes.splice(this.notes.indexOf(id), 1)
    },
    getNotes () {
      this.axios.get('/api/orotangi/notes/')
        .then(response => {
          this.notes = response.data
          /* emit an event to provide the books from the API only once */
          EventBus.$emit('getNotes', this.notes)
        }).catch(error => {
          console.log(error)
        })
    },
    newNote () {
      EventBus.$emit('newNote')
    },
    editNote (note) {
      EventBus.$emit('editNote', note)
    }
  },
  mounted () {
    /* get the notes */
    this.getNotes()
    // reload the notes when one have been edited, created
    EventBus.$on('delNote', (note) => {
      this.delNote(note)
    })
  }

}
</script>
