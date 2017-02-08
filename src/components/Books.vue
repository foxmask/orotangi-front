<template>
	<div class="books">
	<h3>Books</h3>
	<ul>
        <book v-for="book in books">
            {{ book.book }}
        </book>
	</ul>
    </div>
</template>

<script>
import Book from './Book.vue'

export default {
	data() {
		return {
			books: [],
		};
	},
    components: { Book },
    mounted: function() {
        axios.get('http://127.0.0.1:8000/api/orotangi/books/')
			.then(response => {
				this.books = response.data;
            }).catch((error) => {
                console.log(error);
            });
	}

}
</script>