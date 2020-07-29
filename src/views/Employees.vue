<template>
  <div id="app" class="small-container">
    <h1>Employees</h1>
    <employee-form @add:employee="addEmployee"></employee-form>

    <p v-if="employees.length == 0">No Employee</p>
    <employee-table
      v-else
      @delete:employee="deleteEmployee"
      @edit:employee="editEmployee"
      :employees="employees"
    ></employee-table>
  </div>
</template>

<script lang="ts">
import EmployeeForm from '@/components/Employees/EmployeeForm.vue';
import EmployeeTable from '@/components/Employees/EmployeeTable.vue';
import { Vue, Component } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const employees = namespace('employees');
@Component({
  components: {
    EmployeeForm,
    EmployeeTable
  }
})
export default class App extends Vue {
  @State employees: any;
  @Action addEmployee: any;
  @employees.Action getEmployees: any;
  @Action deleteEmployee: any;
  @Action editEmployee: any;

  mounted(): void {
    this.getEmployees();
  }
  get length(): number {
    return this.employees.length;
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
