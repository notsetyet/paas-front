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
        path: '/my-course-admin',
        name: 'MyCourseAdmin',
        component: () => import('../views/MyCourseAdmin.vue')
    },
    {
        path: '/my-course',
        name: 'MyCourse',
        component: () => import('../views/MyCourse.vue')
    },
    {
        path: '/courseinfo-admin/:id',
        name: 'CourseinfoAdmin',
        component: () => import('../views/CourseinfoAdmin.vue')
    },
    {
        path: '/courseinfo/:id',
        name: 'Courseinfo',
        component: () => import('../views/Courseinfo.vue')
    },
    // {
    //     path: '/test',
    //     name: 'Shell',
    //     component: () => import('../views/test.vue')
    // },
    {
        path: '/create-container',
        name: 'CreateContainer',
        component: () => import('../views/CreateContainer.vue')
    },
    {
        path: '/create-containers/:id',
        name: 'CreateContainers',
        component: () => import('../views/CreateContainers.vue')
    },
    {
        path: '/manage-container',
        name: 'ManageContainer',
        component: () => import('../views/ManageContainer.vue')
    },
    {
        path: '/create-course',
        name: 'CreateCourse',
        component: () => import('../views/CreateCourse.vue')
    },
    // {
    //     path: '/personal',
    //     name: 'Personal',
    //     component: () => import('../views/Personal.vue')
    // },
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
