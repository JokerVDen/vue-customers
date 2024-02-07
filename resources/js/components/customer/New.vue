<template>
  <div class="customer-new">
    <form @submit.prevent="add">
      <table class="table">
        <tr>
          <td>Name</td>
          <td>
            <input type="text" class="form-control" v-model="customer.name" placeholder="Customer name"/>
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>
            <input type="email" class="form-control" v-model="customer.email" placeholder="Customer email"/>
          </td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>
            <input type="text" class="form-control" v-model="customer.phone" placeholder="Customer phone"/>
          </td>
        </tr>
        <tr>
          <td>Website</td>
          <td>
            <input type="text" class="form-control" v-model="customer.website" placeholder="Customer website"/>
          </td>
        </tr>
        <tr>
          <td class="text-end p-lg-2">
            <router-link to="/customers" class="btn btn-danger">Cancel</router-link>
          </td>
          <td class="text-right">
            <input type="submit" class="btn btn-primary" value="Create">
          </td>
        </tr>
      </table>
    </form>
    <div class="errors" v-if="errors">
      <ul>
        <li v-for="(fieldError, fieldName) in errors" :key="fieldName">
          <strong>{{ fieldName }}</strong> {{ fieldError.join(', ')}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import validate from 'validate.js';
export default {
  name: 'new',
  data() {
    return {
      customer: {
        name: '',
        email: '',
        phone: '',
        website: '',
      },
      errors: null,
    }
  },
  methods: {
    add() {
      this.errors = null;

      const constraints = this.getConstraints();

      const errors = validate(this.$data.customer, constraints);

      if (errors) {
        this.errors = errors

        return;
      }

      debugger;

      axios.post('/api/customers/', this.$data.customer, {
        headers: {
          'authorization': `Bearer ${this.currentUser.token}`,
          'accept': 'application/json',
        }
      }).then(() => {
        this.$router.push('/customers');
      });
    },
    getConstraints() {
      return {
        name: {
          presence: true,
          length: {
            minimum: 3,
            message: 'Must be at least 3 characters long',
          }
        },
        email: {
          presence: true,
          email: true,
        },
        phone: {
          presence: true,
          numericality: true,
          length: {
            minimum: 10,
            message: 'Must be at least 10 digits long',
          }
        },
        website: {
          presence: true,
          url: true,
        }
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
}
</script>

<style>
.errors {
  background: lightcoral;
  border-radius: 5px;
  padding: 21px 0 2px 0;
  color: white;
}
</style>
