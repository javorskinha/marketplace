import './assets/custom-bootstrap.scss';
import 'bootstrap';
import './assets/main.css';
import "vue-toastification/dist/index.css";
import Toast, { POSITION } from "vue-toastification";

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(Toast, {
    position: POSITION.BOTTOM_RIGHT
});

app.mount('#app');
