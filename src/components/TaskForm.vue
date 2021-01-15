<template>
      <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Task:</label>
                <input v-model="task.title" type="text" class="form-control" id="recipient-name">
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Category:</label>
                <select v-model="task.category" class="form-select" aria-label="Default select example">
                  <option v-for="(category,idx) in categories" :key="idx" :value="category"> {{ category }}</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="clearForm" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>            
            <button v-if="!task.id" @click="saveTask" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Task</button>
            <button v-else @click="updateTask" type="button" class="btn btn-success" data-bs-dismiss="modal">Update Task</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'TaskForm',
  props: ['categories', 'task'],
  data() {
    return {
      taskName: this.task.title,
      category: this.task.category
    }
  },
  methods: {
    saveTask() {
      const newTask = {
        title: this.task.title,
        category: this.task.category
      };
      this.$emit('addNewTask', newTask);
    },

    updateTask() {
      const updatedTask = {
        id: this.task.id,
        title: this.task.title,
        category: this.task.category
      };
      this.$emit('updateTask', updatedTask);      
    },

    clearForm() {
      this.task = {};
    }
  },
  mounted () {
    console.log(this.task, '<<<< task');
  }
}
</script>

<style>

</style>