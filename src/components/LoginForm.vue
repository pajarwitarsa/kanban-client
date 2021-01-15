<template>
  <div class="container" id="sign-in-form">
    <div class="row justify-content-center" style="margin-top: 100px;">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-transparent mb-0">Welcome to kanban App</div>
          <div class="card-body">
            <form action="" @submit.prevent="">
              <div class="form-group mb-2">
                <input v-model="email" type="email" id="login-email" class="form-control" placeholder="Enter email address" required>
              </div>
              <div class="form-group mb-2">
                <input v-model="password" type="password" id="login-password" class="form-control" placeholder="Password" required>
              </div>
              <div class="form-group mt-4">
                <button @click="login" type="submit" id="" class="w-100 btn btn-primary" style="background-color: #4e73df;">                   
                  <div class="loading-div" v-if="loading">
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    <span class="sr-only">Loading...</span>
                  </div>       
                  <span class="sr-only" v-else>Sign In</span>               
                </button>
              </div>
              <div class="form-group mt-4 mb-3">
                <a href="" @click.prevent="$emit('changePage', 'register')">New to Kanban app? Sign Up</a>
              </div>
              <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
  name: 'LoginForm',
  props: ['loading'],
  data() {
    return {
      email: '',
      password: '',
      params: {
        client_id: "309535552197-k2jpi8q3uelire783icqfebnep5j68ro.apps.googleusercontent.com"
      },
      renderParams: {
        margin: '20px',
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password
      };
      this.$emit('login', data);
    },
    onSuccess(googleUser) {
      const data = {
        idToken: googleUser.getAuthResponse().id_token
      };
      this.$emit('loginGoogle', data);      
    }
  },
  components: {
    GoogleLogin
  }
}
</script>

<style>

</style>