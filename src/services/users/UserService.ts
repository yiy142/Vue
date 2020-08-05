import BaseServiceClass from '@/services/BaseServiceClass';

class UserService extends BaseServiceClass {
  constructor() {
    super();
  }
  login(data: any) {
    return this.service({
      url: '/user/login',
      method: 'post',
      data
    });
  }

  getInfo(token: any) {
    return this.service({
      url: `/user/info`,
      method: 'get',
      params: { token }
    });
  }

  logout() {
    return this.service({
      url: 'user/logout',
      method: 'post'
    });
  }
}

export default new UserService();
