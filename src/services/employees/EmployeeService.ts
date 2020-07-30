import BaseServiceClass from '@/services/BaseServiceClass';

class EmployeeService extends BaseServiceClass {
  constructor() {
    super();
  }
  getEmployeesAjax(): any {
    return this.GET(`/employees`);
  }
  deleteEmployeesAjax(id: number): any {
    return this.DELETE(`/employees?id=${id}`);
  }
  addEmployeeAjax(payload: any): any {
    return this.POST(`/employees`, payload);
  }
  putEmployeeAjax(id: number, payload: any): any {
    return this.PUT(`/employees?id=${id}`, payload);
  }
}

export default new EmployeeService();
