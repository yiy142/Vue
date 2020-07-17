const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    id: {
        type: Number
    },
    deleted:{
        type: Boolean
    }
});

const Employee = mongoose.model("Employee", employeeSchema, 'employee');
module.exports = Employee;