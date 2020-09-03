import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Tasks from '@/components/Tasks'
import Registration from '@/components/Registration'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter(to, from, next) {
            store.getters.check_user ? next() : next('/login')
        }
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: Tasks,
        beforeEnter(to, from, next) {
            store.getters.check_user ? next() : next('/login')
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/registration',
        name: 'registration',
        component: Registration
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router