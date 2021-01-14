<template>

  <login-form 
    v-if="page == 'login'"
    @changePage="changePage"
    @login="login"
  ></login-form>

  <register-form 
    v-else-if="page == 'register'"
    @changePage="changePage"
    @register="register"
  ></register-form>

   <kanban-board 
    v-else-if="page == 'board'"
    @changePage="changePage"
    @logout="logout"
  ></kanban-board >

</template>

<script>

import axios from 'axios';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import KanbanBoard from './components/KanbanBoard';


export default {
  name: 'App',
  data() {
    return {
      server: 'https://kanban-server-6655.herokuapp.com',
      page: 'login'
      
    };
  },
  computed: {
    tasks: []
  },
  components: {
    LoginForm,
    RegisterForm,
    KanbanBoard
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
      axios.post(this.server + '/login', data)
      .then(response => {
        Swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
          .then(res => {
            localStorage.setItem('access_token', response.data.access_token);
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
      this.changePage('login');
    },

    getAllTask() {
      axios.get(this.server + '/tasks', { headers: { access_token: localStorage.access_token } })
      .then(response => {
        this.tasks = response.data; 
        console.log(response);
      })
      .catch(err => { 
        console.log(err);
      })
    }

  }
};
</script>

<style scoped>
</style>