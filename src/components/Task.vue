<template>
    <div class="card mb-3" v-if="task.category == this.category">
      <h5 class="card-title m-3"> {{ task.title }} </h5>
      <p class="card-text mb-1"> {{ task.User.email }} </p>
      <p class="card-text"><small class="text-muted">{{ getDate() }}</small></p>
      <div class="row">
        <div class="col">
          <button @click="$emit('getTask', task.id)" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-success m-2">Edit</button>
          <button @click="$emit('deleteTask', task.id)" class="btn btn-danger  m-2">Delete</button>      
        </div>
      </div>      
    </div>
</template>
<script>
export default {
  name: 'Task',
  props: ['task', 'category'],
  methods: {
    getDate() {
      return new Date(this.task.updatedAt).toLocaleString();
    }

  }
}
</script>

<style>

</style>