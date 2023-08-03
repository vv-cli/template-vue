import { createApp } from 'vue';
import VConsole from 'vconsole';
import store from 'store';
import router from '@/router';

import 'normalize.css';
import './style/global.less';
import './style/reset-vant.less';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';

import App from './App.vue';

if (import.meta.env.MODE !== 'production') {
  new VConsole();
}

createApp(App).use(router).use(store).mount('#app');
