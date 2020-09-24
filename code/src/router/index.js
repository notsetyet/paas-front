import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        // meta: {
        //     auth: false,
        // }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/service-list',
        name: 'ServiceList',
        component: () => import('../views/ServiceList.vue')
    },
    {
        path: '/create-container',
        name: 'CreateContainer',
        component: () => import('../views/CreateContainer.vue')
    },
    {
        path: '/manage-container',
        name: 'ManageContainer',
        component: () => import('../views/ManageContainer.vue')
    },
    {
        path: '/personal',
        name: 'Personal',
        component: () => import('../views/Personal.vue')
    },
    {
        path: '/changepassword',
        name: 'ChangePassword',
        component: () => import('../views/ChangePassword.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});


export default router
