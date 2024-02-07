import './bootstrap';
import {createApp} from 'vue/dist/vue.esm-bundler';
import {createRouter, createWebHistory} from 'vue-router'
import storeData from './store.js'
import {createStore} from 'vuex'
import {routes} from "./routes";
import MainApp from "./components/MainApp.vue";
import 'bootstrap';
import '@popperjs/core';
import Head from "./components/Header.vue";

const app = createApp({})
app.config.devtools = true;

const store = createStore(storeData);

const router = createRouter({
    routes,
    history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = store.state.currentUser;

    if (requiresAuth && !currentUser) {
        next('/login');
    } else if (to.path === '/login' && currentUser) {
        next('/');
    } else {
        next();
    }
})

app.use(router)
app.use(store)

app.component('main-app', MainApp)
app.component('header-app', Head)

app.mount('#app')
