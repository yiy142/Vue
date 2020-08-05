import { User } from '../types';
import UserService from '@/services/users/UserService';
import { ActionContext } from 'vuex';
import { getToken, setToken } from '@/utils/auth';

const state: User = {
  token: getToken(),
  username: '',
  email: '',
  id: -1,
  lastlogin: null,
  avatar: null,
  roles: []
};

const mutations = {};

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      UserService.login({
        username: username.trim(),
        password: password
      })
        .then((res) => {
          const { data } = res;
          commit('set_TOKEN', data.token);
          setToken(data.token);
          resolve(data);
        })
        .catch((error) => {
          console.dir(error);
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
};
