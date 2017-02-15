<template>
    <div>
        <div class="col-xs-1 col-md-1 col-lg-1">
            <tags></tags>
            <books></books>
        </div>
        <div class="col-xs-11 col-md-11 col-lg-11">
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