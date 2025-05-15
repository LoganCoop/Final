import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { currentUser } from './models/users'
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';


const userToken = localStorage.getItem('userToken')
if (userToken) {
  try {
    currentUser.value = JSON.parse(userToken)
  } catch (e) {
    currentUser.value = null
  }
}

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App)

app.use(router)
app.use(vuetify);

app.mount('#app')
