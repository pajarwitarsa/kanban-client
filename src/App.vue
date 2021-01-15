<template>

  <login-form 
    v-if="page == 'login'"
    :loading="loading"
    @changePage="changePage"
    @login="login"
    @loginGoogle="loginGoogle"
  ></login-form>

  <register-form 
    v-else-if="page == 'register'"
    @changePage="changePage"
    @register="register"
  ></register-form>

  <div v-else-if="page == 'board'">
    <navbar-page @logout="logout"></navbar-page>
    <kanban-board     
      @changePage="changePage"
      @addNewTask="addNewTask"
      @updateTask="updateTask"
      @getTask="getTask"
      @deleteTask="deleteTask"
      :task="task"
      :tasks="tasks">
    </kanban-board >
  </div>   

</template>

<script>

import axios from 'axios';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import KanbanBoard from './components/KanbanBoard';
import NavbarPage from './components/NavbarPage';

export default {
  name: 'App',
  data() {
    return {
      server: 'https://kanban-server-6655.herokuapp.com',
      // server: 'http://localhost:3000',
      page: 'login',
      tasks: [],
      loading: false,
      task: {}
    };
  },
  computed: {

  },
  components: {
    LoginForm,
    RegisterForm,
    KanbanBoard,
    NavbarPage
  },
  created(){
    if(localStorage.getItem('access_token')) {
      this.changePage('board');
      this.getAllTask();
    }
  },
  
  methods: {   

    changePage(page) {
      console.log(page);
      this.page = page;
    },

    login(data){
      if (!data) return false;
      this.loading = true;
      axios.post(this.server + '/login', data)
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token);
        this.getAllTask();
        Swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
          .then(res => {
            this.loading = false;
            this.changePage('board');
          })
      })
      .catch(err => {
        if(err.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
          .then(res => {
            this.loading = false;
            this.changePage('login');
          })
        }
      })
    },

    loginGoogle(idToken) {
      console.log(idToken);
      this.loading = true;
      axios.post(this.server + '/loginGoogle', idToken)
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token);
        this.getAllTask();
        Swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
          .then(res => {
            this.loading = false;
            this.changePage('board');
          })
      })
      .catch(err => {
        console.log(err);
        if(err.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
          .then(res => {
            this.loading = false;
            this.changePage('login');
          })
        }
      })
    },

    register (data) {
      axios.post(this.server + '/register', data)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Register Success, please login',
          showConfirmButton: true
        })
        .then(res => {
          this.changePage('login');
        })
      })
      .catch(err => {
        if(err.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data[0].message
          })
          .then(res => {
            this.changePage('register');
          })
        }
      })
    },

    logout() {
      localStorage.clear();
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      this.changePage('login');      
    },

    getAllTask() {
      axios.get(this.server + '/tasks', { headers: { access_token: localStorage.access_token } })
      .then(response => {
        this.tasks = response.data; 
        console.log(this.tasks, '<<<<');
      })
      .catch(err => { 
        console.log(err);
      })
    },

    addNewTask(newTask) {
      console.log('masukk app', newTask);
      this.task = {};
      axios.post(this.server + '/tasks', newTask, { headers: { access_token: localStorage.access_token } })
      .then(response => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1000
          })
          .then(res => {
            this.getAllTask();
          })
      })
      .catch(err => { 
        if(err.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data[0].message
          })
          .then(res => {
            this.changePage('board');
          })
        }
      })
    },

    deleteTask(taskId) {
      axios.delete(this.server + '/tasks/' + taskId, { headers: { access_token: localStorage.access_token } })
      .then(response => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1000
          })
          .then(res => {
            this.getAllTask();
          })
      })
      .catch(err => { 
        if(err.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
          .then(res => {
            this.changePage('board');
          })
        }
      })
    },

    getTask(taskId) {
      console.log('masuk app');
      axios.get(this.server + '/tasks/' + taskId, { headers: { access_token: localStorage.access_token } })
      .then(response => {
        document.querySelector('#exampleModal').style.display = 'block';
        document.querySelector('.modal-backdrop').style.display = 'block';
        this.task = response.data;
      })
      .catch(err => {
        if(err.response.status === 401) {
          document.querySelector('#exampleModal').style.display = 'none';
          document.querySelector('.modal-backdrop').style.display = 'none';
          
          this.task = {};
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
          .then(res => {         
            this.changePage('board');
          })
        }
      })
    },

    updateTask(updatedTask) {
      console.log('update masuk app', updatedTask);
      this.task = {};
      axios.put(this.server + '/tasks/' + updatedTask.id, updatedTask, { headers: { access_token: localStorage.access_token } })
      .then(response => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1000
          })
          .then(res => {
            this.getAllTask();
          })
      })
      .catch(err => { 
        if(err.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data[0].message
          })
          .then(res => {
            this.changePage('board');
          })
        }
      })
    }


  }
};
</script>

<style scoped>
</style>