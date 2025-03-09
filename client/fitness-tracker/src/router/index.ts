import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home.vue'
import StatsPage from '../views/stats.vue'
import PeopleSearch from '@/views/peopleSearch.vue'
import SignUp from '@/views/signUp.vue'
import FriendActivity from '@/views/friendActivity.vue'
import LogIn from '@/views/logIn.vue'
import MyActivity from '@/views/myActivity.vue'
import AdminPanel from '@/views/admin.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/my-activity',
    name: 'my-activity',
    component: MyActivity
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsPage
  },
  {
    path: '/friend-activity',
    name: 'friend-activity',
    component: FriendActivity
  },
  {
    path: '/people-search',
    name: 'people-search',
    component: PeopleSearch
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPanel
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
