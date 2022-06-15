import { createApp } from 'vue'
import App from './App.vue'
import Toaster from "@meforma/vue-toaster"

import './styles/app.css'

const app = createApp(App)

app.use(Toaster)

app.provide('toast', app.config.globalProperties.$toast)        
app.mount('#app')
