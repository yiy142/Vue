<template>
    <div id="employee-form">
        <form @submit.prevent="handleSubmit">
            <label for="ename"> Employee Name </label>
            <input 
                id="ename" 
                type="text" 
                v-model="employee.name" 
                @focus="clearStatus" 
                @keypress="clearStatus" 
                :class="{'has-error': invalidName }"
                ref="first"
            >
            <label for="eEmail"> Employee Email </label>
            <input 
                id="eEmail" 
                type="text" 
                v-model="employee.email"
                @focus="clearStatus" 
                @keypress="clearStatus" 
                :class="{'has-error': invalidEmail }"
            >
            <p v-if="!submitted && error !==''" class = "error-message"> {{error}} </p>
            <p v-if="submitted" class="success-message"> Employee Successfully Added </p>
            <input type="submit" value="Add Employee">
        </form>
    </div>
</template>

<script>
import {Vue, Component, axios} from '@/modules.js'

@Component({
    name: 'employee-form',
    watch: {
    }
})

export default class EmployeeForm extends Vue{
    employee = {
        name: '',
        email: ''
    }
    submitted = false;
    invalidName = false;
    invalidEmail = false;
    handleSubmit(){
        //TODO, update backend
        if (this.error === '' ){
            this.$emit('add:employee', this.employee);
            this.$refs.first.focus();
            this.submitted = true;
            this.employee = {name: '', email: ''};
        }
        else alert("invalid input");
    }

    clearStatus() {
        this.submitted = false;
    }

    get error(){
        if (this.employee.name === '' && this.employee.email === '') return '';
        if (this.employee.name.indexOf(' ') == -1 || this.employee.name.indexOf(' ') == this.employee.name.length -1){
            this.invalidName = true;
            return 'Please provide full name, seperated by space';
        }
        this.invalidName=false;
        if (this.employee.email.indexOf('@') == -1 || this.employee.email.indexOf('@') == this.employee.email.length -1){
            this.invalidEmail = true;
            return 'Please provide valid email address';
        }
        this.invalidEmail = false;
        return '';
    }
}
</script>

<style scoped>
form{
    margin-bottom: 2rem;
}
  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }
</style>