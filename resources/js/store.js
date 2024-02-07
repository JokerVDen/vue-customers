import {getLocalUser} from "./helpers/auth.js";

const user = getLocalUser()

export default {
    state: {
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        authError: null,
        customers: [],
    },
    getters: {
        isLoading(state) {
            return state.loading
        },
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        currentUser(state) {
            return state.currentUser
        },
        authError(state) {
            return state.authError
        },
        customers(state) {
            return state.customers
        },
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.authError = null;
        },
        loginSuccess(state, payload) {
            state.loading = false;
            state.isLoggedIn = true
            state.authError = null;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});

            localStorage.setItem('user', JSON.stringify(state.currentUser))
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.authError = payload.error;
        },
        logout(state) {
            localStorage.removeItem('user');
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        setCustomers(state, customers) {
            state.customers = customers
        },
        addCustomer(state, customer) {
            state.customers.push(customer);
        }
    },
    actions: {
        login(context) {
            context.commit('login')
        },
        logout(context) {
            context.commit('logout')
        },
        getCustomers(context) {
            axios.get('/api/customers').then(res => {
                context.commit('setCustomers', res.data.customers)
            }).catch(err => {
                console.log(err)
            })
        }
    },
}
