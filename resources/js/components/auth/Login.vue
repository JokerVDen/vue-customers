<template>
  <div class="login row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body p-4">
            <form @submit.prevent="authenticate">
              <div class="mb-3 row">
                <label for="email">Email:</label>
                <input type="email" v-model="form.email" class="form-control" placeholder="Email Address">
              </div>
              <div class="mb-3 row">
                <label for="email">Password:</label>
                <input type="password" v-model="form.password" class="form-control" placeholder="Password">
              </div>
              <div class="row">
                <input type="submit" class="btn btn-primary" value="Login">
              </div>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {login} from "../../helpers/auth.js";

export default {
  name: "login",
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null
    }
  },
  methods: {
    authenticate() {
      this.$store.dispatch('login')
      login(this.$data.form)
          .then((res) => {
            this.$store.commit('loginSuccess', res);
            this.$router.push('/');
          })
          .catch(error => {
            this.$store.commit('loginFailed', {error})
          })
    }
  }
}
</script>

<style>

</style>