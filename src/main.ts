import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// Plugins einfügen
app.use(router);

// App mounten
app.mount('#app');
