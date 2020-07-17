"use strict"
const express = require('express');
const colors = require('colors/safe');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./connection.js");
const Employee = require("./models/Employee.model");

const PORT = 8081;
const HOST = '0.0.0.0';
var app = express()

function makeMessage(req) {
    return `${colors.blue(`[${req.method}]`)}`;
}


let data = [{
    id: 100,
    name: 'Yi Yang',
    email: 'yyang26@ebay.com'
  },
  {
    id: 101,
    name: 'Drew Xin',
    email: 'zxin@ebay.com'
}];

connectDB(2000, connection =>{
    app.use(bodyParser.json())
    app.use(cors());

    app.get('/employees', (req, res) =>{
        //find all
        Employee.find({'deleted': false}).exec(function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            }
            else {
                res.status(200).json(result);
            }
        });
        res.status(100);
    });
    
    app.post('/employees', (req, res) =>{
        Employee.countDocuments({}, (err, count)=>{
            if (count > 0){
                Employee.findOne().sort({_id: -1}).limit(1).exec(function(err, result){
                    if (err){
                        console.error(err);
                        res.status(500).send(err);
                    }
                    else{
                        let newId = result.id + 1;
                        const newEmployee = new Employee({...req.body, deleted: false, id: newId});
                        newEmployee.save(err => {
                            if (err) return res.status(500).send(err);
                            return res.status(200).send(newEmployee);
                        });
                    }
                });
            }
            else{
                let newId = 1;
                const newEmployee = new Employee({...req.body, deleted: false, id: newId});
                newEmployee.save(err => {
                    if (err) console.error(res.status(500).send(err));
                    return res.status(200).send(newEmployee);
                });
            }
        });

        res.status(100);  
    });
    
    app.delete('/employees', (req, res)=>{
        Employee.findOneAndRemove({id: req.query.id}, (err, employee)=>{
            if (err) console.error(res.status(500).send(err));
            res.status(200).json({
                message: "Successfully deleted",
                id: employee.id
            });
        })
    });
    
    app.put('/employees', (req,res)=>{

        Employee.findOneAndUpdate({id: req.query.id}, req.body, {new: true}, (err, employee)=>{
            if (err) return res.status(500).send(err);
            res.send(employee);
        });
    })
    
    app.listen(PORT, HOST);
    console.log(`running at http://localhost:`+PORT);
})

