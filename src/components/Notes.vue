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
            <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
        </nav>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
/* to broadcast an event */
import { EventBus } from '../core/EventBus.js'
// note content
import Note from './Note.vue'

export default {
  props: ['bookName'],
  data () {
    return {
      notes: []
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'refreshNote'
  },
  components: { Note, InfiniteLoading },
  methods: {
    onInfinite () {
      let params = {}
      params.book = this.bookName
      params.page = (this.notes.length / 20) + 1
      this.axios.get('/api/orotangi/notes/', {
        params: params
      }).then((res) => {
        if (res.data.count) {
          this.notes = this.notes.concat(res.data.results)
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          if (this.notes.count / 20 === 10) {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
        } else {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
        }
      })
    },
    refreshNote () {
      this.bookName = this.$route.params.bookName
      this.notes = []
      this.onInfinite()
    },
    delNote (id) {
      this.axios.delete('/api/orotangi/notes/' + id + '/'
        ).catch((error) => {
          console.log(error)
        })
      this.notes.splice(this.notes.indexOf(id), 1)
    },
    newNote () {
      EventBus.$emit('newNote')
    },
    editNote (note) {
      EventBus.$emit('editNote', note)
    }
  },
  mounted () {
    // reload the notes when one have been edited, created
    EventBus.$on('delNote', (note) => {
      this.delNote(note)
    })
  }

}
</script>
