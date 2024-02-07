import './bootstrap';
import {createApp} from 'vue/dist/vue.esm-bundler';
import {createRouter, createWebHistory} from 'vue-router'
import storeData from './store.js'
import {createStore} from 'vuex'
import {routes} from "./routes";
import MainApp from "./components/MainApp.vue";
import 'bootstrap';
import '@popperjs/core';
import {initialize} from "./helpers/general.js";

const store = createStore(storeData);

const router = createRouter({
    routes,
    history: createWebHistory(),
})

initialize(store, router);

const app = createApp({config: {devtools: true}});

app.use(router)
app.use(store)

app.component('main-app', MainApp)

app.mount('#app')
