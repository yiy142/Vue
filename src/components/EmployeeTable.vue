<template>
  <div id="employee-table">
    <table>
      <thead>
        <tr>
          <th> # </th>
          <th>ID</th>
          <th>Employee Name</th>
          <th>Employee Email</th>
          <th> Actions </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee,index) in employees" :key="employee.id">
          <td> {{index + 1}} </td>
          <td> {{employee.id}} </td>

          <td v-if="editing === employee.id">
            <input type="text" v-model="employee.name" />
          </td>
          <td v-else> {{employee.name}} </td>
          
          <td v-if="editing === employee.id">
            <input type="text" v-model="employee.email" />
          </td>
          <td v-else> {{employee.email}} </td>
          
          <td v-if="editing === employee.id">
            <button @click="editEmployee(employee)">Save</button>
            <button @click="cancelEdit(employee)" class="muted-button">Cancel</button>
          </td>

          <td v-else>
            <button @click="editMode(employee)" class="muted-button">Edit</button>
            <button @click="$emit('delete:employee', employee.id)" class="muted-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {Vue, Component, axios} from '@/modules.js'

@Component({
  props: {employees: Array},
  name: 'employee-table'
})
export default class EmployeeTable extends Vue{
  editing = null;
  cached = null;
  editingEmp = null;

  editMode(employee){
    if (this.editing != null){
      if (confirm("Do you want to discard current edit? ")){
        Object.assign(this.editingEmp, this.cached);
      }
      else{return;}
    }
    this.cached = Object.assign({}, employee);
    this.editing = employee.id;
    this.editingEmp = employee;
  }

  editEmployee(employee){
    if (employee.name === '' || employee.email === '') return;
    this.$emit('edit:employee', employee.id, employee);
    this.editing = null;
    this.cached = null;
    this.editingEmp = null;
  }

  cancelEdit(employee){
    Object.assign(employee, this.cached);
    this.editing = null;
    this.cached = null;
    this.editingEmp = null;
  }
}

</script>

<style scoped>
button {
    margin: 0 0.5rem 0 0;
    padding: 5px 10px 5px 10px;
  }
</style>