import Vue from 'vue';
import axios from 'axios';
import VeeValidate from 'vee-validate';

import App from './App.vue';
import router from './route';
import store from './store/index';
import './registerServiceWorker';

// Styles
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/style.scss';

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.prototype.$api = process.env.VUE_APP_API_URL;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
