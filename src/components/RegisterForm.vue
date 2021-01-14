<template>
  <div class="container" id="sign-up-form">
    <div class="row justify-content-center" style="margin-top: 100px;">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-transparent">Register</div>
          <div class="card-body">
            <form action="" @submit.prevent="">
              <div class="form-group mb-2">
                <input v-model="email" type="email" id="register-email" class="form-control" placeholder="Enter email address" required>
              </div>
              <div class="form-group mb-2">
                <input v-model="password" type="password" id="register-password" class="form-control" placeholder="Password" required>
              </div>
              <div class="form-group mt-4">
                <input @click="register" type="submit" id="" value="Sign Up" class="w-100 btn btn-primary" style="background-color: #3b5998;">
              </div>
              <div class="form-group mt-4">
                <a href="" @click.prevent="$emit('changePage', 'login')">Already have an account? Sign In</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      email: '',
      password: '',
      loading: ''
    };
  },
  methods: {
    register () {
      const data = {
        email: this.email,
        password: this.password
      };
      this.$emit('register', data);
    }
  }  
}
</script>

<style>

</style>