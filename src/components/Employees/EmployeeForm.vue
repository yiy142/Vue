<template>
  <div id="employee-form">
    <div style="margin: 20px;"></div>
    <el-form
      label-position="top"
      status-icon
      :model="employee"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="Employee Name" prop="name">
        <el-input ref="first" v-model="employee.name"></el-input>
      </el-form-item>
      <el-form-item label="Employee Email" prop="email">
        <el-input v-model="employee.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit('form')"
          >Submit</el-button
        >
        <el-button @click="resetForm('form')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class EmployeeForm extends Vue {
  employee: { name: string; email: string } = {
    name: '',
    email: ''
  };
  submitted = false;
  invalidName = false;
  invalidEmail = false;
  rules = {
    name: [
      {
        validator: this.validateName,
        trigger: 'change'
      }
    ],
    email: [
      {
        validator: this.validateEmail,
        trigger: 'change'
      }
    ]
  };
  validateName(rule: any, value: any, callback: any) {
    if (!value) {
      return callback(new Error('Name Cannot Be Empty'));
    }
    if (
      this.employee.name.indexOf(' ') == -1 ||
      this.employee.name.indexOf(' ') == this.employee.name.length - 1
    ) {
      this.invalidName = true;
      return callback(
        new Error('Please provide full name, seperated by space')
      );
    }
    return callback();
  }

  validateEmail(rule: any, value: any, callback: any) {
    if (!value) {
      return callback(new Error('Email Cannot Be Empty'));
    }
    if (
      this.employee.email.indexOf('@') == -1 ||
      this.employee.email.indexOf('@') == this.employee.email.length - 1
    ) {
      this.invalidEmail = true;
      return callback(new Error('Please provide valid email address'));
    }
    this.invalidEmail = false;
    return callback();
  }

  handleSubmit(formName: string): void {
    (this.$refs[formName] as any).validate((valid: any) => {
      if (valid) {
        this.$emit('add:employee', this.employee);
        this.resetForm(formName);
        (this.$refs.first as HTMLElement).focus();
      } else {
        this.$alert('invalid input');
      }
    });
  }

  resetForm(formName: any) {
    (this.$refs[formName] as any).resetFields();
  }
}
</script>

<style>
label.el-form-item__label {
  margin-bottom: 0px;
  padding-bottom: 0px !important;
}
</style>
