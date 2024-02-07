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
    if (this.customers.length) {
      this.customer = this.customers.find(customer => customer.id === parseInt(this.$route.params.id))
    } else {
      axios.get(`/api/customers/${this.$route.params.id}`).then(res => {
        this.customer = res.data.customer;
      });
    }
  },
  data() {
    return {
      customer: null,
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    customers() {
      return this.$store.getters.customers;
    }
  }
}
</script>
