<template>
  <div>
    <div class="container-fluid mt-4 category">
      <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Task</button>
      <task-form :categories="categories" @addNewTask="addNewTask"></task-form>
      <div class="row">
        <category v-for="(category, i) in categories" :key="i" :category="category"
          @addNewTask="addNewTask"
          @deleteTask="deleteTask"
          :tasks="tasks"
        ></category>
      </div>
    </div>
  </div>
</template>

<script>

import Category from './Category';
import TaskForm from './TaskForm';


export default {
  name: 'KanbanBoard',
  props: ['tasks'],
  components: {
    Category,
    TaskForm
  },
  data() {
    return {
      categories: ['Backlog', 'Todo', 'Doing', 'Done'],
      showForm: false
    }
  },  
  methods: {
    addNewTask(newTask) {
      console.log('masuk kanban board', newTask);
      this.$emit('addNewTask', newTask);
    },
    deleteTask(taskId) {
      this.$emit('deleteTask', taskId);
    },
    changeFormStatus() {
      this.showForm = true
    }
  },  
}
</script>

<style>
  .navbar{
    background-color: lightblue;
  }
</style>