<template>
  <div>
      <navbar></navbar>
      <div class="container-fluid">
      <div class="row">
          <div class="col-xs-2 col-md-2 col-lg-2">
            <books></books>
          </div>
          <div class="col-xs-10 col-md-10 col-lg-10">
            <notes></notes>
            <take-note></take-note>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Books from './components/Books.vue'
import Notes from './components/Notes.vue'
import TakeNote from './components/TakeNote.vue'
export default {
  components: { Navbar, Books, Notes, TakeNote }
}
</script>
