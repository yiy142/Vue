import Vue from 'vue';
import App from './views/Employees.vue';
import router from './router';
import store from './store';
import Cookies from 'js-cookie';
import enLang from 'element-ui/lib/locale/lang/en';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './icons';

Vue.config.productionTip = false;
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
});
Vue.prototype.$alert = Element.MessageBox.alert;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
