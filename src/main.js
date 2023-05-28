import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuex from './store';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.css'

import 'vuetify/dist/vuetify.min.css';


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);

app.use(vuex);
app.use(router);

// const vuetify = new Vuetify();
app.use(vuetify)

app.mount('#app');