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
router.post('/createInvoice', createInvoice);
router.post('/getInvoice', getInvoice);

function createInvoice(req, res) {
    var useritems = req.body.items != undefined && req.body.items.length ? req.body.items : [];
    var insertArray = JSON.stringify(useritems);
    var datetime = new Date();
    var dateobj = datetime.toISOString().slice(0, 10);
    var user = {
        id: req.body.id ? req.body.id : '',
        biller_name: req.body.biller_name ? req.body.biller_name : null,
        address_1: req.body.address_1 ? req.body.address_1 : null,
        address_2: req.body.address_2 ? req.body.address_2 : null,
        items: insertArray ? insertArray : null,
        tax: req.body.tax ? req.body.tax : null,
        gst_number: req.body.gst_number ? req.body.gst_number : null,
        invoice_number: '',
        created_date: dateobj
    };
    var sql = `insert into invoice_master(
        biller_name,
        address_1,
        address_2,
        items,
        tax,
        gst_number,
        created_date
    ) values (
        '`+ user.biller_name + `',
        '`+ user.address_1 + `',
        '`+ user.address_2 + `',
        '`+ user.items + `',
        '`+ user.tax + `',
        '`+ user.gst_number + `',
        '`+ user.created_date + `'
    )`;
    console.log("createInvoice sql ---------------> " + sql)
    pool.getConnection(function (err2, con2) {
        if (!err2) {
            con2.query(sql, function (err3, rows1) {
                if (!err3) {
                    var year = new Date().getFullYear();
                    var month = "0" + new Date().getMonth();
                    var inc = +month + +1;
                    var current = "0" + inc;
                    user.invoice_number = "RK" + year + current + rows1.insertId;
                    user.id = rows1.insertId;
                    setSecretKey(user);
                    var jsonObject = {};
                    jsonObject["status"] = "1";
                    jsonObject["message"] = "Employee Invoice Created Successfully";
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

function getInvoice(req, res) {
    var invoice_id = req.body.invoice_id ? req.body.invoice_id : null;
    if (invoice_id) {
        var sql = ` select 
                        c.*
                    from invoice_master as c 
                    where 
                        c.id= ` + invoice_id + `
                    limit 1`;
        console.log("getDocument sql ===> " + sql);
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
        jsonObject["message"] = "invoice_id are required";
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