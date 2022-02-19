import { createApp } from 'vue';
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';
import store from './store';
import App from './App.vue';

import 'framework7/framework7-bundle.min.css';
import './global.less';

Framework7.use(Framework7Vue);

const app = createApp(App);

registerComponents(app);

app.use(store);
app.mount('#app');
