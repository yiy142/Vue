import BaseServiceClass from '@/services/BaseServiceClass';

class EmployeeService extends BaseServiceClass {
  constructor() {
    super();
  }
  getEmployeesAjax(payload?: Record<string, unknown>): any {
    return this.GET(`/employees`);
  }
  deleteEmployeesAjax(id: number, payload?: Record<string, unknown>): any {
    return this.DELETE(`/employees?id=${id}`);
  }
  addEmployeeAjax(payload: Record<string, unknown>): any {
    return this.POST(`/employees`, payload);
  }
  putEmployeeAjax(id: number, payload: Record<string, unknown>): any {
    return this.PUT(`/employees?id=${id}`, payload);
  }
}

export default new EmployeeService();
