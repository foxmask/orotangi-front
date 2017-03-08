<template>
    <div class="columns">
        <div class="column is-1">
            <tags></tags>
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
import Tags from './components/Tags.vue';
import Books from './components/Books.vue';
import Notes from './components/Notes.vue';
import TakeNote from './components/TakeNote.vue';
export default {
    components: { Notes, TakeNote, Books, Tags }
}
</script>
