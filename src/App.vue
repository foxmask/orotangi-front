<template>
    <div class="columns">
        <div class="column is-1">
            <books></books>
        </div>
        <div class="column is-11">
            <div class="columns">
            <notes></notes>
            <take-note></take-note>
            </div>
        </div>
    </div>
</template>

<script>
import Books from './components/Books.vue'
import Notes from './components/Notes.vue'
import TakeNote from './components/TakeNote.vue'
export default {
  components: { Books, Notes, TakeNote }
}
</script>
