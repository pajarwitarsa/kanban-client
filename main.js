const vue = new Vue({
  el: '#app',
  data: {
    server: 'https://kanban-server-6655.herokuapp.com',
    page: 'login',
    email: '',
    password: ''
  },
  methods:{
    changePage(page) {
      this.page = page;
      this.clearForm();
    },
    register: async function() {
      try {
        if(this.email && this.password) {
          const data = {
            email: this.email,
            password: this.password
          };
          const response = await axios.post(this.server + '/register', data);
          Swal.fire({
            icon: 'success',
            title: 'Register Success, please login',
            showConfirmButton: true
          })
          .then(res => {
            this.changePage('login');
          })
        }
      }
      catch (err) {
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
      }
    },
    login: async function(e) {
      try {
        if(this.email && this.password) {
          const data = {
            email: this.email,
            password: this.password
          };
          
          const response = await axios.post(this.server + '/login', data);
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
          .then(res => {
            this.changePage('board');
          })
        }        
      }
      catch (err) {
        if(err.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
          .then(res => {
            this.changePage('login');
          })
        }
      }
    },
    logout () {
      this.changePage('login');
    },
    clearForm () {
      this.email = ''
      this.password = ''
    }
  }
});