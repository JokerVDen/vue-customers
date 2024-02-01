import './bootstrap';
import {createApp} from 'vue/dist/vue.esm-bundler';
import {createMemoryHistory, createRouter} from 'vue-router'
import storeData from './store.js'
import {createStore} from 'vuex'
import {routes} from "./routes";
import MainApp from "./Components/MainApp.vue";
import 'bootstrap';
import '@popperjs/core';
import Head from "./Components/Header.vue";

const app = createApp({})

const store = createStore(storeData);

const router = createRouter({
    routes,
    history: createMemoryHistory(),
})

app.use(router)
app.use(store)

app.component('main-app', MainApp)
app.component('header-app', Head)

app.mount('#app')
