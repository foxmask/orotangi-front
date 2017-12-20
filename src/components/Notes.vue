<template>
  <div class="col-xs-3 col-md-3 col-lg-3">
    <div class="panel panel-warning">
      <div class="panel-heading">
        <h3 class="panel-title">Notes</h3>
      </div>
      <div class="articles">
        <ul class="list-group">
        <note v-for="note in notes" :key="note.id">
            <li class="list-group-item"><i class="fa fa-file-text-o"></i> <a href="#" @click="editNote(note)">{{ note.title }}</a></li>
        </note>
        </ul>
        <infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
            <span slot="no-results">no notes found</span>
            <span slot="no-more">no more notes</span>
        </infinite-loading>
      </div>
      <div class="panel-footer">
          <button class="btn btn-success" @click="newNote()"><i class="fa fa-plus"></i> note</button>
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
/* to broadcast an event */
import { EventBus } from '../core/EventBus.js'
// note content
import Note from './Note.vue'

export default {
  data () {
    return {
      notes: [],
      page: 1,
      q: ''
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

      if ((this.notes.length / 20) < 1) {
        params.page = this.page
      } else {
        this.page = (this.notes.length / 20) + 1
        params.page = this.page
      }

      if (this.q !== '') {
        params.q = this.q
        params.page = this.page
      }

      this.axios.get('/api/orotangi/notes/', {
        params: params
      }).then((res) => {
        if (res.data.count > 0) {
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
      this.q = ''
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
    },
    searchNote () {
      this.notes.length = 0
      this.onInfinite()
    }
  },
  mounted () {
    this.notes = []
    this.q = ''
    this.$nextTick(() => {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    })
    // reload the notes when one have been edited, created
    EventBus.$on('delNote', (note) => {
      this.delNote(note)
    })
    EventBus.$on('searchNote', (q) => {
      this.q = q
      this.searchNote()
    })
  }

}
</script>

<style>
  .articles {
    height: 470px;
    overflow: auto;
  }
</style>
