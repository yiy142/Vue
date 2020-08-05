import BaseServiceClass from '@/services/BaseServiceClass';

class EmployeeService extends BaseServiceClass {
  constructor() {
    super();
  }
  getEmployeesAjax(): any {
    return this.service({
      url: `/employees`,
      method: 'get'
    });
  }
  deleteEmployeesAjax(id: number): any {
    return this.service({
      url: `/employees?id=${id}`,
      method: 'delete'
    });
  }

  addEmployeeAjax(payload: any): any {
    return this.service({
      url: `/employees`,
      method: 'post',
      data: payload
    });
  }
  putEmployeeAjax(id: number, payload: any): any {
    return this.service({
      url: `/employees?id=${id}`,
      method: 'put',
      data: payload
    });
  }
}

export default new EmployeeService();
