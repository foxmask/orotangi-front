<template>
    <div class="books">
        <nav class="panel">
            <p class="panel-heading">
                <span class="panel-icon"><i class="fa fa-book"></i></span> Books
            </p>
            <book v-for="book in books" :key="book.id">{{ book.book }}</book>
        </nav>
    </div>
</template>

<script>
/* to broadcast an event */
import { EventBus } from '../core/EventBus.js';

import Book from './Book.vue'

export default {
    data() {
        return {
            books: [],
        };
    },
    components: { Book },
    mounted() {
        /* get the books */
        this.axios.get('/api/orotangi/books/')
            .then(response => {
                this.books = response.data;
                /* emit an event to provide the books from the API only once */
                EventBus.$emit("getBooks", this.books)
            }).catch(error => {
                console.log(error);
            })
    }
}
</script>