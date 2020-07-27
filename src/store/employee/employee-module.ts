import axios, { AxiosResponse } from 'axios';
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
    state.employees = state.employees.filter(employee => employee.id !== id);
  },
  editById(state: State, payload: { id: number; newVal: Employee }): void {
    state.employees = state.employees.map(employee => (employee.id === payload.id ? payload.newVal : employee));
  },
  addEmployee(state: State, newVal: Employee): void {
    state.employees = [...state.employees, newVal];
  },
  receiveEmployees(state: State, employees: Employee[]): void {
    state.employees = employees;
  }
};

const actions = {
  getEmployess(context: ActionContext<State, any>): any {
    context.commit('receiveEmployees');
    const res = EmployeeService.getEmployeesAjax().then((res: any) => {
      context.commit('receiveEmployees', res);
    });
  },
  deleteEmployee(context: ActionContext<State, any>, id: number): any {
    context.commit('deleteById', id);
    EmployeeService.deleteEmployeesAjax(id).then((res: any) => {
      context.commit('deleteById');
    });
  },
  editEmployee(context: ActionContext<State, any>, payload: { id: number; newVal: Employee }): any {
    context.commit('editById', payload);
    EmployeeService.putEmployeeAjax(payload.id, payload).then((res: any) => {
      context.commit('editById', payload);
    });
  },
  addEmployee(context: ActionContext<State, any>, newVal: any | Employee): any {
    context.commit('editById', newVal);
    return EmployeeService.POST('/employees', newVal).then((res: any) => {
      context.commit('addEmployee', newVal);
    });
  }
};

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
};
