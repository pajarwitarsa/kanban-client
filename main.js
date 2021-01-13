const vue = new Vue({
  el: '#app',
  data: {
    server: 'https://kanban-server-6655.herokuapp.com',
    page: 'login',
    email: '',
    password: '',
    loading: false
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
    login: async function() {
      try {
        if(this.email && this.password) {
          this.loading = true;
          const data = {
            email: this.email,
            password: this.password
          };          
          const response = await axios.post(this.server + '/login', data);
          this.loading = false;
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
            this.loading = false;
            this.changePage('login');
          })
        }
      }
    },
    onSignIn: async function(googleUser) {
      try {
        const idToken = googleUser.getAuthResponse().id_token;
        const response = await axios.post(this.server + '/loginGoogle', { idToken });
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
      }
      catch (err) {
        console.log(err.response);
      }
    },
    logout () {
      localStorage.clear();
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      this.changePage('login');
    },
    clearForm () {
      this.email = ''
      this.password = ''
    }
  },
  created(){
    if(localStorage.getItem('access_token')) {
      this.changePage('board');
    }
  },
  mounted() {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    });
  }
});