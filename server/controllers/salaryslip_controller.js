var express = require('express');
var fs = require('fs');
path = require('path');
var router = express.Router();
var dates = require('../dates');
var pool = require('../database')();
var dir = require('../directories');

/*******************************************************************************/
/**************************************WEB**************************************/
/*******************************************************************************/
router.post('/createSalarySlip', createSalarySlip);
router.post('/getSalarySlip', getSalarySlip);

function createSalarySlip(req, res) {
    var useritems = req.body.employee_name != undefined && req.body.employee_name.length ? req.body.employee_name : [];
    var insertArray = JSON.stringify(useritems);
    var user = {
        id: req.body.id ? req.body.id : '',
        employee_name : insertArray ? insertArray : '',
        month : req.body.month ? req.body.month : ''
    };
    var sql = `insert into salaryslip_master(
        employee_name,
        month
    ) values (
        '`+ user.employee_name + `',
        '`+ user.month + `'
    )`;
    console.log("createSalarySlip sql ---------------> " + sql)
    pool.getConnection(function (err2, con2) {
        if (!err2) {
            con2.query(sql, function (err3, rows1) {
                if (!err3) {
                    user.id = rows1.insertId;
                    var jsonObject = {};
                    jsonObject["status"] = "1";
                    jsonObject["message"] = "Employee Salary Slip Created Successfully";
                    jsonObject["data"] = user;
                    res.send(jsonObject);
                } else {
                    var jsonObject = {};
                    jsonObject["status"] = "0";
                    jsonObject["message"] = "DB " + err3;
                    jsonObject["data"] = [];
                    res.send(jsonObject);
                }
                con2.release();
            });
        } else {
            var jsonObject = {};
            jsonObject["status"] = "0";
            jsonObject["message"] = "CON: " + err2;
            jsonObject["data"] = [];
            res.send(jsonObject);
        }
    });
}

function getSalarySlip(req, res) {
    var salaryslip_id = req.body.salaryslip_id ? req.body.salaryslip_id : null;
    if (salaryslip_id) {
        var sql = ` select 
                        c.*
                    from salaryslip_master as c 
                    where 
                        c.id= ` + salaryslip_id + `
                    limit 1`;
        console.log("getSalarySlip sql ===> " + sql);
        pool.getConnection(function (err1, con1) {
            if (!err1) {
                con1.query(sql, function (err, rows) {
                    if (!err) {
                        var jsonObject = {};
                        jsonObject["status"] = "1";
                        jsonObject["message"] = rows.length + " Records found";
                        jsonObject["data"] = rows[0];
                        res.send(jsonObject);
                    } else {
                        var jsonObject = {};
                        jsonObject["status"] = "0";
                        jsonObject["message"] = "DB :" + err;
                        jsonObject["data"] = [];
                        res.send(jsonObject);
                    }
                    con1.release();
                });
            } else {
                var jsonObject = {};
                jsonObject["status"] = "0";
                jsonObject["message"] = "CON :" + err1;
                jsonObject["data"] = [];
                res.send(jsonObject);
            }
        });
    } else {
        var jsonObject = {};
        jsonObject["status"] = "0";
        jsonObject["message"] = "salaryslip_id are required";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }
}

var setSecretKey = function (data) {
    return new Promise((resolve) => {
        if (data.invoice_number && data.id) {
            var sql = ` update invoice_master set invoice_number = '` + data.invoice_number + `'
                        where id = `+ data.id + ``;
            console.log("setSecretKey sql ==========> " + sql)
            pool.getConnection(function (err1, con1) {
                if (!err1) {
                    con1.query(sql, function (err, rows) {
                        if (!err) {
                            resolve({ status: 1, data: data });
                        } else {
                            resolve({ status: 0, data: "DB : " + err });
                        }
                        con1.release();
                    });
                } else {
                    resolve({ status: 0, data: "CON: " + err1 });
                }
            });
        } else {
            resolve({ status: 0, data: "id and key are required" });
        }
    })
}

module.exports = router;    