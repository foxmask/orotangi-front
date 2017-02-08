<template>
	<div class="tags">
	<h3>Tags</h3>
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
		}
	},
    components: { Tag },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/orotangi/tags/')
            .then(response => {
            this.tags = response.data;
		}).catch((error) => {
				console.log(error);
		});
    }
}
</script>