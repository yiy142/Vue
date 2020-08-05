import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue'; // svg component

// register globally
Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);

req.keys().forEach((key) => {
  req(key);
});
