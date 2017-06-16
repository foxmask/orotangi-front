<template>
  <div>
  <!-- Fixed navbar -->
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="" title="Home">Orotangi</a>
      </div>
      <div class="collapse navbar-collapse">

        <ul class="nav navbar-nav">

        </ul>
        <div class="navbar-right">
          <ul class="nav navbar-nav">
            <li>
              <form class="navbar-form">
                <input class="form-control" v-model="q" @keyup.enter="searchNote()" type="text" placeholder="Search">
                <div class="btn btn-default"><span class="icon is-small"><i class="fa fa-search"></i></span></div>
              </form>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user-o"></i> <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Profile</a></li>
                <li role="separator" class="divider"></li>
                <li><a href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  </div>
</template>


<script>
  /* to broadcast an event */
  import { EventBus } from '../core/EventBus.js'

  export default {
    props: ['bookName'],
    data () {
      return {
        q: ''
      }
    },
    methods: {
      searchNote () {
        EventBus.$emit('searchNote', this.q)
      }
    }
  }
</script>
