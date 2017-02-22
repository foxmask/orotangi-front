<template>
    <div class="columns">
        <div class="column is-1">
            <tags></tags>
            <books></books>
        </div>
        <div class="column is-11">
            <take-note></take-note>
        </div>
    </div>
</template>

<script>
import Tags from './components/Tags.vue';
import Books from './components/Books.vue';
import TakeNote from './components/TakeNote.vue';
export default {
    components: { TakeNote, Books, Tags }
}
</script>