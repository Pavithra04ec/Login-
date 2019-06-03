const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
//const con = require('./models');
const joi = require('joi')
const schema = require('./joi');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'logindb'
});
con.connect(() => {
    console.log('db connected');
})

app.get('/api/get', (req,res)=>{
    const sql = 'SELECT * FROM datadb'
    con.query(sql, (err, result) => {
        res.status(200).json(result);
    })
});
app.get('/api/getBy/:Email', (req,res)=>{
    //const Email = req.params.Email;
    const sql = 'SELECT * FROM datadb WHERE Email=?'
    con.query(sql,[req.params.Email], (err, result) => {
        res.status(200).json({
            status: "Success",
            Data: result
        });
    })
});
app.post('/api/register', (req,res)=>{
    let sql = "INSERT INTO datadb set ?";
    //Register Details
    let value = {
        Name: req.body.Name,
        Email: req.body.Email,
        MobileNo: req.body.MobileNo,
        Age: req.body.Age,
        Address: req.body.Address,
        Password: req.body.Password
    }
    //joi validation
    joi.validate(value, schema, (err, validationresult) => {
        //Hash the Request Password
        validationresult.Password = bcrypt.hashSync(validationresult.Password);
        //joi Validation Error
        if (err) {
            res.status(404).json({ status: 'Error', Error: 'joi validation error', err });
        }
        //validation Success =>
        else {
            con.query(sql, validationresult, (err, result) => {
                //Details Already Exists
                if (err) {
                    res.status(500).json({
                        status: "Error",
                        Error: 'Email Already Exist '
                    })
                }
                // if(err){
                //     res.json(err)
                // }
                //Details successfully Register
                else {
                    res.status(200).json({
                        status: "Successfully Registered"
                    });
                }
            });
        }
    });
});
app.post('/api/login', (req,res)=>{
    const email1 = req.body.Email;
    //const Pwd = req.body.Password;
    //gte the Details in Database
    var sql = `SELECT * FROM datadb where Email=?`;
    con.query(sql, [email1], function (err, userInfo) {
        //Details Not Found
        if (!userInfo || userInfo.length === 0) {
            res.status(404).json({Error:"invalid Email"});
        }
        else {
            //compare the request password and register password ,result ==true
            bcrypt.compare(req.body.Password, userInfo[0].Password, (err, result) => {
                //the Password Should Be Wrong
                if (!result == true) {
                    return res.status(500).json({failed: 'Unauthorized Access & Enter Correct Password'});
                }
                else {
                    //Update the status
                    //const sql = 'UPDATE datadb set Status = 1 where Email = ?';
                    const email1 = req.body.Email;
                    con.query(sql, [email1]);
                    //login Success
                    res.status(200).json({
                        status: "Login Success"
                    });
                };
            });
        }
    });
});
app.put('/api/put', (req, res) => {
    //console.log(req.query.Email)
    const sql = "update datadb set Name=?,MobileNo=?,Age=?,Address=? where Email=?"
    //console.log(req.body)
    con.query(sql, [req.body.Name, req.body.MobileNo, req.body.Age, req.body.Address,req.query.Email], (err, result) => {
        if (err) {
            res.status(404).json(err);
        }
        else {
            res.status(200).json(result);
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports = app;