import BaseServiceClass from '@/services/BaseServiceClass';

export default class EmployeeService extends BaseServiceClass {
  static getEmployeesAjax(payload?: Record<string, unknown>): any {
    return this.GET(`/employees`);
  }
  static deleteEmployeesAjax(id: number, payload?: Record<string, unknown>): any {
    return this.DELETE(`/employees?id=${id}`);
  }
  static addEmployeeAjax(payload: Record<string, unknown>): any {
    return this.POST(`/employees`, payload);
  }
  static putEmployeeAjax(id: number, payload: Record<string, unknown>): any {
    return this.PUT(`/employees?id=${id}`, payload);
  }
}
