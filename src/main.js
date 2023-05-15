import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from './store'

createApp(App)
.use(vuex)
.use(router)
.mount('#app')
