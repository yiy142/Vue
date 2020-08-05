import Vue from 'vue';
import Vuex from 'vuex';
import employees from '@/store/employee/employee-module';
import users from '@/store/users/user-module';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    employees,
    users
  }
});
