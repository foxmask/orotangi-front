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
import axios from 'axios';
import Book from './Book.vue'

export default {
	data() {
		return {
			books: [],
		};
	},
    components: { Book },
	methods: {
        addBook: function () {
            var newBook = {
                book: this.book.trim()
            };
            axios.post('http://127.0.0.1:8000/api/orotangi/books/', newBook)
        },
        delBook: function (book) {
            axios.delete('http://127.0.0.1:8000/api/orotangi/books/'.concat(book.id));
            this.books.splice(this.books.indexOf(book), 1);
        }
    },
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