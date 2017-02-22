<template>
    <div class="tags">
    <h1 class="title">Tags</h1>
    <ul>
        <tag v-for="tag in tags">
            {{ tag.tag }}
        </tag>
    </ul>
    </div>
</template>

<script>
import Tag from './Tag.vue'

export default {
    data() {
        return {
            tags: []
        };
    },
    components: { Tag },
    mounted() {
        axios.get('/api/orotangi/tags/')
            .then(response => {
                this.tags = response.data;
            }).catch(error => {
                console.log(error);
            })
    }
}
</script>