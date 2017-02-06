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
import axios from 'axios';
import Tag from './Tag.vue'

export default {
	data() {
		return {
			tags: []
		}
	},
    components: { Tag },
	methods: {
        addTag: function () {
            var newTag = {
                tag: this.tag.trim()
            };
            axios.post('http://127.0.0.1:8000/api/orotangi/tags/', newTag)
        },
        delTag: function (tag) {
            axios.delete('http://127.0.0.1:8000/api/orotangi/tags/'.concat(tag.id));
            this.tags.splice(this.tags.indexOf(tag), 1);
        }
    },
    mounted: function() {
        axios.get('http://127.0.0.1:8000/api/orotangi/tags/')
            .then(response => {
            this.tags = response.data;
		}).catch((error) => {
				console.log(error);
		});
    }
}
</script>