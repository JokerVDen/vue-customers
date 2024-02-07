import Home from "./components/Home.vue";
import Login from "./components/auth/Login.vue";
import CustomerMain from "./components/customer/Main.vue";
import CustomerList from "./components/customer/List.vue";

export const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/customers',
        component: CustomerMain,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '',
                component: CustomerList,
            },
        ]
    }
]