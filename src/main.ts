import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Cookies from 'js-cookie';
import enLang from 'element-ui/lib/locale/lang/en';
import Element from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss';
import './icons';
import * as filters from './filters';

import './permission';

Vue.config.productionTip = false;
Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  locale: enLang
});
Vue.prototype.$alert = Element.MessageBox.alert;

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
