import { Employee } from '../types';
import EmployeeService from '@/services/employees/EmployeeService';
import { ActionContext } from 'vuex';

interface State {
  employees: Employee[];
}
const state: State = {
  employees: []
};

const mutations = {
  deleteById(state: State, id: number): void {
    state.employees = state.employees.filter((employee) => employee.id !== id);
  },
  editById(state: State, payload: { id: number; newVal: Employee }): void {
    state.employees = state.employees.map((employee) =>
      employee.id === payload.id ? payload.newVal : employee
    );
  },
  addEmployee(state: State, newVal: Employee): void {
    state.employees = [...state.employees, newVal];
  },
  receiveEmployees(state: State, employees: Employee[]): void {
    state.employees = employees;
  }
};

const actions = {
  getEmployees(context: ActionContext<State, unknown>): any {
    //context.commit('receiveEmployees');
    EmployeeService.getEmployeesAjax()
      .then((res: any) => {
        context.commit('receiveEmployees', res.data);
      })
      .catch((error: any) => {
        console.log(error);
        context.commit('receiveEmployees', []);
      });
  },
  deleteEmployee(context: ActionContext<State, unknown>, id: number): any {
    EmployeeService.deleteEmployeesAjax(id).then(() => {
      context.dispatch('getEmployees');
    });
  },
  editEmployee(
    context: ActionContext<State, unknown>,
    payload: { id: number; newVal: Employee }
  ): any {
    EmployeeService.putEmployeeAjax(payload.id, payload).then(() => {
      context.dispatch('getEmployees');
    });
  },
  addEmployee(
    context: ActionContext<State, unknown>,
    newVal: any | Employee
  ): any {
    return EmployeeService.addEmployeeAjax(newVal).then(() => {
      context.dispatch('getEmployees');
    });
  }
};

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
};
