<template>
  <div id="app" class="small-container">
    <h1>Employees</h1>
    <employee-form @add:employee="addEmployee"></employee-form>

    <p v-if="employees.length ==0"> No Employee </p>
    <employee-table 
      v-else 
      @delete:employee="deleteEmployee" 
      @edit:employee="editEmployee"
      :employees="employees">
    </employee-table>
  </div>
</template>

<script>
import {Vue, Component, axios} from '@/modules.js'
import EmployeeForm from '@/components/EmployeeForm.vue'
import EmployeeTable from '@/components/EmployeeTable.vue'
const baseURL = 'http://localhost:8081';

  //API Call
  async function ajaxGet(){
    try {
      const res = await axios.get(baseURL + '/employees');
      this.employees = res.data;
      console.log(res);
    }
    catch (error){
      console.error(error);
    }
  }

  async function ajaxPost(employee){
    try{
      const res = await axios.post(baseURL + '/employees', {data: employee});
      console.log(res);
    }
    catch(error){
      console.error(error);
    }
  }

  async function ajaxDel(id){
    try{
      const res = await axios.delete(baseURL + '/employees', {data: id});
      console.log(res);
    }
    catch(error){
      console.error(error);
    }
  }

  async function ajaxPut(employee){
    try{
      const res = await axios.put(baseURL + '/employees', {data: employee});
      console.log(res);
    }
    catch(error){
      console.error(error);
    }
  }


@Component({
  props: {},
  watch: {},
  components:{
    EmployeeTable, 
    EmployeeForm
  }
})

export default class App extends Vue{
  //Data
  employees = []
  
  //hooks
  mounted(){
    this.getEmployees();
  }

  //Computed
  get length(){
    return this.employees.length;
  }

  //Methods
  async getEmployees(){
    try {
      const response = await axios.get(baseURL + '/employees');
      this.employees = response.data;
    } catch (error) {
      console.error(error)
    }
  }

  async addEmployee(employee){
    try {
      const response = await axios.post(baseURL + '/employees', employee)
      this.employees = [...this.employees, response.data] //this sould contain id info
    } catch (error) {
      console.error(error)
    }
  }

  async deleteEmployee(id){
    try {
      await axios.delete(baseURL + `/employees?id=${id}`);
      this.employees = this.employees.filter(employee => employee.id !== id);
    } catch (error) {
      console.error(error);
    }
  }

  async editEmployee(id, updatedEmployee){
    try {
      const response = await axios.put(baseURL + `/employees?id=${id}`, updatedEmployee);
      this.employees = this.employees.map(employee => (employee.id === id ? response.data : employee))
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style>
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 780px;
}
</style>
