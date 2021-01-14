<template>
    <div class="card mb-3" v-if="task.category == this.category">
      <p class="m-3"> {{ task.title }}</p>
      <p class="m-3"> {{ task.category }}</p>
      <div class="row">
        <div class="col">
          <button  class="btn btn-success m-2">Edit</button>
          <button @click="$emit('deleteTask', task.id)" class="btn btn-danger  m-2">Delete</button>      
        </div>
      </div>      
    </div>
</template>
<script>
export default {
  name: 'Task',
  props: ['task', 'category'],
  taskId: ''
}
</script>

<style>

</style>