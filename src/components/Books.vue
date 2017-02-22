<template>
    <div class="books">
    <h1 class="title">Books</h1>
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
    components: { Book },
    mounted() {
        axios.get('/api/orotangi/books/')
            .then(response => {
                this.books = response.data;
            }).catch(error => {
                console.log(error);
            })
    }
}
</script>