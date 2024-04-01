import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import stores from './stores'
import axios from 'axios';

// Quasar Ui
import { Quasar, Cookies, Dialog, Loading, SessionStorage, LocalStorage } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import 'quasar/src/css/index.sass'

// CSS
import './assets/main.css'

import customDialog from '@/components/CustomDialog.vue'

const app = createApp(App)
app.use(Quasar, {
  plugins: {
    SessionStorage,
    LocalStorage,
    Cookies,
    Dialog,
    Loading
  },
})

app.use(router)
app.use(stores)
app.component('custom-dialog', customDialog);

axios.defaults.baseURL = 'http://localhost:3000'

app.mount('#app')
