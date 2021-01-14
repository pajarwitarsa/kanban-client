<template>
  <div>
    <header>
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="" @click.prevent="">K A N B A N</a>
          <button @click="$emit('logout')" class="btn btn-outline-success" type="submit">Sign Out</button>
      </nav>
    </header>
    <category></category>
  </div>
</template>

<script>

import Category from './Category';

export default {
  name: 'KanbanBoard',
  components: {
    Category
  }
}
</script>

<style>
  .navbar{
    background-color: lightblue;
  }
</style>