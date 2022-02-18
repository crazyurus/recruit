import { createApp } from 'vue';
import Framework7 from 'framework7/lite';
import Framework7Vue from 'framework7-vue';

import App from './App.vue';

import 'framework7/framework7.css';

Framework7.use(Framework7Vue);
createApp(App).mount('#app');
