<template>
      <!-- Modal -->
    <div v-if="showForm" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <input v-model="taskName" type="text" class="form-control" id="recipient-name">
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Category:</label>
                <select v-model="category" class="form-select" aria-label="Default select example">
                  <option v-for="(category,idx) in categories" :key="idx" :value="category"> {{ category }}</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="saveTask" type="button" class="btn btn-primary">Save Task</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'TaskForm',
  props: ['categories'],
  data() {
    return {
      showForm: true,
      taskName: '',
      category: ''
    }
  },
  methods: {
    saveTask() {
      const newTask = {
        title: this.taskName,
        category: this.category
      };
      console.log(newTask);
      this.$emit('addNewTask', newTask);
    }
  }
}
</script>

<style>

</style>