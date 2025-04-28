import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { currentUser } from './models/users'

// Initialize currentUser from localStorage on app startup
const userToken = localStorage.getItem('userToken')
if (userToken) {
  try {
    currentUser.value = JSON.parse(userToken)
  } catch (e) {
    currentUser.value = null
  }
}

createApp(App).use(router).mount('#app')
