import axios, { AxiosResponse } from 'axios'
import { Employee } from '../types'
import Service from '@/services'
import {ActionContext } from 'vuex'

interface State{
  employees: Employee[]
}
const state:State = {
  employees: [],
}

const mutations = {
  deleteById(state: State, id:Number){
    state.employees = state.employees.filter(employee => employee.id !== id)
  },
  editById(state: State, payload: {id: Number, newVal: Employee}){
    state.employees = state.employees.map(employee => (employee.id === payload.id ? payload.newVal : employee))
  },
  addEmployee(state:State, newVal: Employee){
    state.employees = [...state.employees, newVal]
  },
  receiveEmployees(state:State, employees:Employee[]){
    state.employees = employees
  }
}

const actions = {
  getEmployess(context:ActionContext<State, any>){
    context.commit('receiveEmployees')
    return Service.HTTP('/employees', "get", (status:Number, response:AxiosResponse)=>{
      // Do something on resolve
    }
    ).catch(e=>{console.log(e)})
  },
  deleteEmployee(context: ActionContext<State, any>, id:Number){
    context.commit('deleteById', id)
    return Service.HTTP(`/employees?id=${id}`, "delete", (status: Number, resposne:AxiosResponse) =>{
      // Do something on resolve
    }).catch(e=>{console.log(e)})
  },
  editEmployee(context:ActionContext<State,any>, payload:{id: Number, newVal:Employee}){
    context.commit('editById', payload)
    return Service.HTTP(`/employees?id=${payload.id}`, "delete", (status: Number, resposne:AxiosResponse) =>{
      // Do something on resolve
    }, payload.newVal).catch(e=>{console.log(e)})
  },
  addEmployee(context:ActionContext<State,any>, newVal:Employee){
    context.commit('editById', newVal)
    return Service.HTTP(`/employees`, "delete", (status: Number, resposne:AxiosResponse) =>{
      // Do something on resolve
    }, ).catch(e=>{console.log(e)})
  }
}

export default {
  namespaced: true,
  state: state,
  mutations:mutations,
  actions:actions
};