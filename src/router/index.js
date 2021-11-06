import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/users/users.vue'
import Employees from '../views/employees/employees.vue'
import Admin from '../views/admin/admin.vue'
import Login from '../views/login/index.vue'
import Register from '../views/register/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
