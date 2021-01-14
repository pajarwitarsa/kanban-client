<template>
  <div>
    <div class="container-fluid mt-4 category">
      <button class="btn btn-primary mb-3 mt-0">Add New Task</button>
      <div class="row">
        <div class="col-md-3 text-center" v-for="(category,idx) in categories" :key="idx">
          <div class="card">
            <div class="card header" style="padding: 14px 16px;">{{ category }}</div>
            <task></task>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from './Task';
export default {
  name: 'Category',
  data() {
    return {
      categories: ['Backlog', 'Todo', 'Doing', 'Done']
    };
  },
  components: {
    Task
  }
}
</script>

<style>
  .category {
    padding: 100px;
    padding-top: 0px;
  }
</style>