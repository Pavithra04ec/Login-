const express = require('express');
const router = express();
const bodyParser = require('body-parser');
var cors = require('cors');
var joi = require('joi')
var schema = require('./joi')
router.use(cors());
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeedb'
});
con.connect(() => {
    console.log('db connected');
})

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/api', (req, res) => {
    let sql = 'select * from employee';
    con.query(sql, (err, result) => {
        res.json(result);
    })
})
router.get('/api/count', (req, res) => {
    let sql = 'select count(*) AS NoOfuser from employee'
    con.query(sql, (err, result) => {
        res.json(result);
    })
})
router.post('/api/post', (req, res) => {
    joi.validate(req.body, schema, (err, validationResult) => {
        //console.log(validationResult)
        if (err) {
            return res.status(404).json(err);
        } else {
            let sql = "insert into employeedb.employee(EmpId,Name,Role,PreOrganization) values ?"
            con.query(sql, [validationResult.map(item => [item.EmpId, item.Name, item.Role, item.PreOrganization])],
                (err, result) => {
                    //console.log(result)
                    if (err) {
                        return res.status(404).json(err);
                    }
                    // if (!result) {
                    //     return res.status(404).send("This id is already in use.");
                    // }
                    res.json(result);

                })
        }
    })

});

router.put('/api/put/:EmpId', (req, res) => {
    var EmpId = req.params.EmpId;
    con.query('UPDATE employeedb.employee SET ? where EmpId=?', [req.body,EmpId], function (error, results) {
        if (error) return error;
        res.json(results);
      });

    // })
})

router.delete('/api/delete/:EmpId', (req, res) => {
    let sql = 'call employee_delete(?)';
    //let sql = 'delete from employee where EmpId in (?)'
    con.query(sql, [req.params.EmpId], (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        // if (result.affectedRows == 0) {
        //     return res.status(404).send("The given id is not found for delete request.");
        // }
        res.send(result);
    })
});
router.delete('/api/deletebyId', (req, res) => {
    let sql = 'delete from employee where EmpId in (?)'
    console.log(req.query.EmpId)
    var querysql = JSON.parse(req.query.EmpId)
    console.log(querysql)
    con.query(sql, [querysql], (err, result) => {
        if (err) {
            return res.status(404).send(err);
        }
        // if (result.affectedRows == 0) {
        //     return res.status(404).send("The given id is not found for delete request.");
        // }
        res.send(result);
    })
})


const port = process.env.PORT || 5000;
router.listen(port, () => {
    console.log(`Server connected on ${port}`);
})
module.exports = router;