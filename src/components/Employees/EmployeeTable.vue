<template>
  <div id="employee-table">
    <el-row :gutter="20">
      <el-col :span="6"></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <hr />
    <div class="search-bar">
      <el-input v-model="search" size="big" placeholder="Type to search" />
    </div>
    <el-table
      :data="pagedFilteredEmployees"
      style="width: 100%"
      :default-sort="{ prop: 'id', order: 'descending' }"
      stripe
    >
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column sortable prop="id" label="ID"> </el-table-column>
      <el-table-column label="Employee Name">
        <template slot-scope="scope">
          <div v-if="editing !== scope.row.id">{{ scope.row.name }}</div>
          <div v-else>
            <el-input type="text" v-model="scope.row.name"> </el-input>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Employee Email">
        <template slot-scope="scope">
          <div v-if="editing !== scope.row.id">{{ scope.row.email }}</div>
          <div v-else>
            <el-input type="text" v-model="scope.row.email" />
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Actions" align="center">
        <template slot-scope="scope">
          <div v-if="editing === scope.row.id">
            <el-button
              size="small"
              type="success"
              @click="editEmployee(scope.row)"
            >
              Save
            </el-button>
            <el-button size="small" @click="canceledit(scope.row)">
              Cancel
            </el-button>
          </div>
          <div v-else>
            <el-button size="small" @click="editMode(scope.row)">
              Edit
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="$emit('delete:employee', scope.row.id)"
            >
              Delete
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange()"
        @current-change="handleCurrentChange()"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filteredEmployees.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Employee } from '@/store/types';
import { State, namespace } from 'vuex-class';

const employees = namespace('employees');

@Component
export default class EmployeeTable extends Vue {
  @employees.State employees: any;

  pageSize: number = 2;
  currentPage: number = 1;
  search: string | null = null;
  editing = -1;
  cached: Employee | null = null;
  editingEmp: Employee | null = null;

  editMode(employee: Employee): void {
    if (this.editing !== -1) {
      if (confirm('Do you want to discard current edit? ')) {
        Object.assign(this.editingEmp, this.cached);
      } else {
        return;
      }
    }
    this.cached = Object.assign({}, employee);
    this.editing = employee.id;
    this.editingEmp = employee;
  }

  editEmployee(employee: Employee): void {
    if (employee.name === '' || employee.email === '') return;
    this.$emit('edit:employee', { id: employee.id, newVal: employee });
    //this.$emit('edit:employee', employee.id, employee);

    this.editing = -1;
    this.cached = null;
    this.editingEmp = null;
  }

  cancelEdit(employee: Employee): void {
    Object.assign(employee, this.cached);
    this.editing = -1;
    this.cached = null;
    this.editingEmp = null;
  }

  filterHandler(value: any, row: any, column: any): boolean {
    const property = column['property'];
    return row[property] === value;
  }

  get filteredEmployees() {
    return this.employees.filter(
      (data: any) =>
        !this.search ||
        data.name.toLowerCase().includes(this.search.toLowerCase()) ||
        data.email.toLowerCase().includes(this.search.toLowerCase()) ||
        this.search.toLowerCase().includes('' + data.id)
    );
  }
  get pagedFilteredEmployees() {
    const result = this.filteredEmployees.slice(
      (this.currentPage - 1) * this.pageSize,
      Math.min(this.filteredEmployees.length, this.pageSize * this.currentPage)
    );
    return result;
  }
  handleCurrentChange() {}
  handleSizeChange() {}
}
</script>

<style scoped>
button {
  margin: 0 0.5rem 0 0;
  padding: 5px 10px 5px 10px;
}
.search-bar {
  float: right;
  width: 20%;
  margin-bottom: 0px;
}
</style>
