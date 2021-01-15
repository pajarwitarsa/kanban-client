<template>
  <div class="col-md-3 text-center">
    <div class="overflow-scroll" style="background-color: #3282b8;">
      <div class="card" style="height: 700px">
        <div class="card header" style="padding: 14px 16px;">{{ category }}</div>
        <!-- Task -->            
        <div class="card-body" style="background-color: #3282b8">      
          <task 
            @deleteTask="deleteTask" 
            @getTask="getTask"
            v-for="task in tasks" 
            :key="task.id" :task="task" 
            :category="category">
          </task>
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
      
    };
  },
  methods: {
    getTask(taskId) {
      console.log('masuk category');
      this.$emit('getTask', taskId);
    },
    deleteTask(taskId) {
      this.$emit('deleteTask', taskId);
    }
  },
  components: {
    Task
  },
  props: ['tasks', 'category']
  
}
</script>

<style>
  .category {
    padding-left: 90px;
    padding-right: 70px;
    padding-top: 0px;
  }
</style>