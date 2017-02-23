<template>
    <div class="tags">
        <nav class="panel">
            <p class="panel-heading">
                <span class="panel-icon"><i class="fa fa-tag"></i></span> Tags
            </p>
            <tag v-for="tag in tags">{{ tag.tag }}</tag>
        </nav>
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