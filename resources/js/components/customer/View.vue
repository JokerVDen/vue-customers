<template>
  <div class="customer-view" v-if="customer">
    <table class="table">
      <tr>
        <td>Name</td>
        <td>
          {{ customer.name }}
        </td>
      </tr>
      <tr>
        <td>Email</td>
        <td>
          {{ customer.email }}
        </td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>
          {{ customer.phone }}
        </td>
      </tr>
      <tr>
        <td>Website</td>
        <td>
          {{ customer.website }}
        </td>
      </tr>
    </table>
    <router-link to="/customers">Back to all customers</router-link>
  </div>
</template>

<script>

export default {
  name: 'view',
  created() {
    axios.get(`/api/customers/${this.$route.params.id}`, {
      headers: {
        'authorization': `Bearer ${this.currentUser.token}`,
        'accept': 'application/json',
      }
    }).then(res => {
      this.customer = res.data.customer;
    });
  },
  data() {
    return {
      customer: null,
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
}
</script>
