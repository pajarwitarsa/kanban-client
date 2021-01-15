<template>

    <div class="container-fluid mt-3 category">
      <a href="" @click="clearTask" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img width="50px" height="70px" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yNTYgMGMtMTQxLjE2NDA2MiAwLTI1NiAxMTQuODM1OTM4LTI1NiAyNTZzMTE0LjgzNTkzOCAyNTYgMjU2IDI1NiAyNTYtMTE0LjgzNTkzOCAyNTYtMjU2LTExNC44MzU5MzgtMjU2LTI1Ni0yNTZ6bTAgMCIgZmlsbD0iIzIxOTZmMyIvPjxwYXRoIGQ9Im0zNjggMjc3LjMzMjAzMWgtOTAuNjY3OTY5djkwLjY2Nzk2OWMwIDExLjc3NzM0NC05LjU1NDY4NyAyMS4zMzIwMzEtMjEuMzMyMDMxIDIxLjMzMjAzMXMtMjEuMzMyMDMxLTkuNTU0Njg3LTIxLjMzMjAzMS0yMS4zMzIwMzF2LTkwLjY2Nzk2OWgtOTAuNjY3OTY5Yy0xMS43NzczNDQgMC0yMS4zMzIwMzEtOS41NTQ2ODctMjEuMzMyMDMxLTIxLjMzMjAzMXM5LjU1NDY4Ny0yMS4zMzIwMzEgMjEuMzMyMDMxLTIxLjMzMjAzMWg5MC42Njc5Njl2LTkwLjY2Nzk2OWMwLTExLjc3NzM0NCA5LjU1NDY4Ny0yMS4zMzIwMzEgMjEuMzMyMDMxLTIxLjMzMjAzMXMyMS4zMzIwMzEgOS41NTQ2ODcgMjEuMzMyMDMxIDIxLjMzMjAzMXY5MC42Njc5NjloOTAuNjY3OTY5YzExLjc3NzM0NCAwIDIxLjMzMjAzMSA5LjU1NDY4NyAyMS4zMzIwMzEgMjEuMzMyMDMxcy05LjU1NDY4NyAyMS4zMzIwMzEtMjEuMzMyMDMxIDIxLjMzMjAzMXptMCAwIiBmaWxsPSIjZmFmYWZhIi8+PC9zdmc+" />
      </a>
      <!-- <button type="button" class="btn btn-primary mb-4" @click="clearTask" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Task</button> -->
      <task-form :categories="categories" :task="task" @addNewTask="addNewTask" @updateTask="updateTask"></task-form>
      <div class="row mt-2">
        <category v-for="(category, i) in categories" :key="i" :category="category"
          @getTask="getTask"
          @addNewTask="addNewTask"
          @deleteTask="deleteTask"
          :tasks="tasks"
        ></category>
      </div>
    </div>

</template>

<script>

import Category from './Category';
import TaskForm from './TaskForm';


export default {
  name: 'KanbanBoard',
  props: ['tasks', 'task'],
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
    getTask(taskId) {
      this.$emit('getTask', taskId);
    },
    addNewTask(newTask) {
      console.log('masuk kanban board', newTask);
      this.$emit('addNewTask', newTask);
    },
    updateTask(updatedTask) {
      console.log('masuk kanban board', updatedTask);
      this.$emit('updateTask', updatedTask);
    },
    deleteTask(taskId) {
      this.$emit('deleteTask', taskId);
    },
    changeFormStatus() {
      this.showForm = true
    },
    clearTask() {
      console.log(this.task);
      this.task.title = '';
      this.task.category = '';
    }
  },  
}
</script>

<style>
  .navbar{
    background-color: #03dac6;
  }
</style>