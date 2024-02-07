<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary mb-4">
    <div class="container">
      <router-link to="/" class="navbar-brand">My Vue App</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
              aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav ms-auto">
          <template v-if="!isLoggedIn">
            <li>
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li>
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>
          </template>
          <template v-else>
            <li>
              <router-link to="/customers" class="nav-link">Customers</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="btn dropdown-toggle" href="#" role="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                {{ currentUser.name}} <span class="caret"></span>
              </a>

              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a href="#" @click.prevent="logout" class="dropdown-item">Logout</a></li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'header-app',
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser']),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  }
}
</script>