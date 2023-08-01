import { createApp } from 'vue';
import VConsole from 'vconsole';
import store from 'store';
import router from '@/router';
import './style/global.less';
import './style/theme.less';
// showToast样式
import 'vant/es/toast/style';
// showDialog样式
import 'vant/es/dialog/style';

import App from './App.vue';

if (import.meta.env.MODE !== 'production') {
  new VConsole();
}

createApp(App).use(router).use(store).mount('#app');
