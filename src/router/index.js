import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskBoard from '@/pages/TaskForm.vue'

import VueDraggable from 'vue-draggable'

Vue.use(VueRouter)
Vue.use(VueDraggable)

const routes = [
  {
    path: '/',
    name: 'TaskBoard',
    component: TaskBoard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
