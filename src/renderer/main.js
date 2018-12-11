import Vue from 'vue';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import '@mdi/font/css/materialdesignicons.css';
import 'tui-calendar/dist/tui-calendar.min.css';
// import AtComponents from 'at-ui';
// import 'at-ui-style/src/index.scss'

// import 'material-design-icons-iconfont/dist/material-design-icons.css';

import App from './App';
import router from './router';
import store from './store';

const storage = require('electron-json-storage-sync');

// Local Storage 에서 서버 주소 가져오가서 Vuex 에 저장하기
const result = storage.get('apiServerUrl');
if (!result.status) {
  storage.set('apiServerUrl', 'http://localhost:8000');
}
// 접속 서버 정보 셋팅 : 이 값이 없으면 화면에서 입력받는 구조로 해야함. 처음 앱 설치 과정으로 보면됨
store.commit('setServerUrl', storage.get('apiServerUrl').data);

// Vue.use(AtComponents);
Vue.use(Vuetify, {
  iconfont: 'mdi',
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.http.defaults.baseURL = storage.get('apiServerUrl').data;
Vue.config.productionTip = false;
Vue.storage = Vue.prototype.$storage = storage;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
