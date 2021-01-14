<template>
  <div class="col-md-3 text-center">
    <div class="overflow-scroll" style="background-color:#fff; height: 700px">
      <div class="card">
        <div class="card header" style="padding: 14px 16px;">{{ category }}</div>
        <!-- Task -->            
        <div class="card-body">      
          <task 
            @deleteTask="deleteTask" 
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