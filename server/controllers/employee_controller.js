var express = require('express');
var fs = require('fs');
path = require('path');
var router = express.Router();
var dates = require('../dates');
var pool = require('../database')();
var dir = require('../directories');
var bcrypt = require('bcryptjs');

/*******************************************************************************/
/**************************************WEB**************************************/
/*******************************************************************************/
router.post('/registerEmployee', registerEmployee);
router.post('/getEmployee', getEmployee);
router.post('/updateEmployee', updateEmployee);
router.post('/deleteEmployee', deleteEmployee);
router.post('/countEmployee', countEmployee);
router.post('/employeeByPg', employeeByPg);
router.post('/searchEmployeeData', searchEmployeeData);
router.post('/uploadEmployeeIcon', uploadEmployeeIcon);
router.post('/removeEmployeeIcon', removeEmployeeIcon);
router.post('/getViewEmployeeDetailsById', getViewEmployeeDetailsById);

function registerEmployee(req, res) {
    var users = {
        id: req.body.id ? req.body.id : null,
        name: req.body.name ? req.body.name : null,
        status: req.body.status ? req.body.status : null,
        personal_email: req.body.personal_email ? req.body.personal_email : null,
        official_email: req.body.official_email ? req.body.official_email : null,
        password: req.body.password ? req.body.password : null,
        current_address: req.body.current_address ? req.body.current_address : null,
        permanent_address: req.body.permanent_address ? req.body.permanent_address : null,
        contact_number: req.body.contact_number ? req.body.contact_number : null,
        emergency_number: req.body.emergency_number ? req.body.emergency_number : null,
        add_image: req.body.add_image ? req.body.add_image : null,
        department: req.body.department ? req.body.department : null,
        reporting_to: req.body.reporting_to ? req.body.reporting_to : null,
        user_id: '',
        secret_key: '',
        user_role_id: req.body.department ? req.body.department : null
    };

    if (users.name && users.password && users.personal_email && users.contact_number) {
        checkDuplicateEmployee([`'` + users.personal_email + `'`], [`'` + users.contact_number + `'`]).then(function (resDuplicate) {
            if (resDuplicate.status == 1) {
                var sql = `insert into employee_master(
                    status,
                    name,
                    personal_email,
                    official_email,
                    password,
                    current_address,
                    permanent_address,
                    contact_number,
                    emergency_number,
                    add_image,
                    department,
                    reporting_to
                ) values(
                    '`+ users.status + `',
                    '`+ users.name + `',
                    '`+ users.personal_email + `',
                    '`+ users.official_email + `',
                    '`+ users.password + `',
                    '`+ users.current_address + `',
                    '`+ users.permanent_address + `',
                    '`+ users.contact_number + `',
                    '`+ users.emergency_number + `',
                    `+ (users.add_image ? `'` + users.add_image + `'` : `NULL`) + `,
                    `+ users.department + `,
                    '`+ users.reporting_to + `'
                )`;
                console.log("insertEmployee sql \r\n " + sql);
                console.log("users sql \r\n ", users);
                pool.getConnection(function (err2, con3) {
                    if (!err2) {
                        con3.query(sql, function (err, rows1) {
                            if (!err) {
                                var users = {
                                    id: req.body.id ? req.body.id : null,
                                    status: req.body.status ? req.body.status : null,
                                    name: req.body.name ? req.body.name : null,
                                    personal_email: req.body.personal_email ? req.body.personal_email : null,
                                    official_email: req.body.official_email ? req.body.official_email : null,
                                    password: req.body.password ? req.body.password : null,
                                    current_address: req.body.current_address ? req.body.current_address : null,
                                    permanent_address: req.body.permanent_address ? req.body.permanent_address : null,
                                    contact_number: req.body.contact_number ? req.body.contact_number : null,
                                    emergency_number: req.body.emergency_number ? req.body.emergency_number : null,
                                    add_image: req.body.add_image ? req.body.add_image : null,
                                    department: req.body.department ? req.body.department : null,
                                    reporting_to: req.body.reporting_to ? req.body.reporting_to : null,
                                    user_id: '',
                                    secret_key: '',
                                    user_role_id: req.body.department ? req.body.department : null
                                };
                                if (users.personal_email != undefined && users.personal_email != '' && users.personal_email) {
                                    // For Unique USERNAME
                                    checkUsersEmail(users.personal_email)
                                        .then(function (userRes) {
                                            console.log("userres", userRes);
                                            if (userRes.status == 1) {
                                                bcrypt.hash(users.password, 5, function (err, bcryptedPassword) {
                                                    users.password = bcryptedPassword;
                                                    var sql = `insert into users_master(
                                                            status,
                                                            user_type,
                                                            first_name,
                                                            email_id,
                                                            mobile_no
                                                            ) values (
                                                            '`+ users.status + `',
                                                            '`+ users.department + `',
                                                            '`+ users.name + `',
                                                            '`+ users.personal_email + `',
                                                            '`+ users.contact_number + `'
                                                            )`;
                                                    console.log("registerUsers sql ---------------> " + sql)
                                                    pool.getConnection(function (err2, con2) {
                                                        if (!err2) {
                                                            con2.query(sql, function (err3, rows1) {
                                                                if (!err3) {
                                                                    console.log("enterd in create login", users);
                                                                    createLogin(users).then(function (resLogin) {
                                                                        if (resLogin.status == 1) {
                                                                            var jsonObject = {};
                                                                            jsonObject["status"] = "1";
                                                                            jsonObject["message"] = "Users Login Details Created Successfully";
                                                                            jsonObject["data"] = users;
                                                                            res.send(jsonObject);
                                                                        } else {
                                                                            var jsonObject = {};
                                                                            jsonObject["status"] = "0";
                                                                            jsonObject["message"] = resLogin.data;
                                                                            jsonObject["data"] = users;
                                                                            res.send(jsonObject);
                                                                        }
                                                                    })
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
                                                });
                                            } else {
                                                var jsonObject = {};
                                                jsonObject["status"] = "0";
                                                jsonObject["message"] = "Usersname already taken please choose another one";
                                                jsonObject["data"] = [];
                                                res.send(jsonObject);
                                            }
                                        });
                                } else {
                                    var jsonObject = {};
                                    jsonObject["status"] = "0";
                                    jsonObject["message"] = "username is required to register users";
                                    jsonObject["data"] = [];
                                    res.send(jsonObject);
                                }
                                // var jsonObject = {};
                                // jsonObject["status"] = "1";
                                // jsonObject["message"] = "Employee Inserted Successfully";
                                // jsonObject["data"] = rows1.insertId;
                                // res.send(jsonObject);
                            } else {
                                var jsonObject = {};
                                jsonObject["status"] = "0";
                                jsonObject["message"] = "DB :" + err;
                                jsonObject["data"] = [];
                                res.send(jsonObject);
                            }
                            con3.release();
                        });
                    } else {
                        var jsonObject = {};
                        jsonObject["status"] = "0";
                        jsonObject["message"] = "CON: " + err2;
                        jsonObject["data"] = [];
                        res.send(jsonObject);
                    }
                });
            } else {
                var jsonObject = {};
                jsonObject["status"] = "0";
                jsonObject["message"] = "Duplicate Employee Email Or Contact Found, please choose another one!";
                jsonObject["data"] = [];
                res.send(jsonObject);
            }
        })
    } else {
        var jsonObject = {};
        jsonObject["status"] = "0";
        jsonObject["message"] = "users name, personal email and contact number are required";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }
}

function getEmployee(req, res) {
    var employee_id = req.body.employee_id ? req.body.employee_id : null;
    if (employee_id) {
        var sql = ` select 
                        c.*
                    from employee_master as c 
                    where 
                        c.id= ` + employee_id + `
                    limit 1`;
        console.log("getEmployee sql ===> " + sql);
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
        jsonObject["message"] = "employee id are required";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }
}

function updateEmployee(req, res) {
    var users = {
        id: req.body.id ? req.body.id : null,
        status: req.body.status ? req.body.status : null,
        name: req.body.name ? req.body.name : null,
        personal_email: req.body.personal_email ? req.body.personal_email : null,
        official_email: req.body.official_email ? req.body.official_email : null,
        password: req.body.password ? req.body.password : null,
        current_address: req.body.current_address ? req.body.current_address : null,
        permanent_address: req.body.permanent_address ? req.body.permanent_address : null,
        contact_number: req.body.contact_number ? req.body.contact_number : null,
        emergency_number: req.body.emergency_number ? req.body.emergency_number : null,
        add_image: req.body.add_image ? req.body.add_image : null,
        department: req.body.department ? req.body.department : null,
        reporting_to: req.body.reporting_to ? req.body.reporting_to : null
    };

    if (users.id) {
        var sql1 = `update employee_master set 
                        status = '`+ users.status + `',
                        name = '`+ users.name + `',
                        personal_email = "`+ users.personal_email + `",
                        official_email = "`+ users.official_email + `",
                        password = "`+ users.password + `",
                        current_address = "`+ users.current_address + `",
                        permanent_address = "`+ users.permanent_address + `",
                        emergency_number = "`+ users.emergency_number + `",
                        personal_email = "`+ users.personal_email + `",
                        add_image = `+ (users.add_image ? `'` + users.add_image + `'` : `NULL`) + `,
                        department = "`+ users.department + `",
                        reporting_to = "`+ users.reporting_to + `"
                    where id =`+ users.id;
        console.log("updateEmployee sql \r\r\n\n" + sql1)
        pool.getConnection(function (err2, con2) {
            if (!err2) {
                con2.query(sql1, function (err, rows1) {
                    if (!err) {
                        if (rows1.affectedRows > 0) {
                            var jsonObject = {};
                            jsonObject["status"] = "1";
                            jsonObject["message"] = "Employee Updated Successfully";
                            jsonObject["data"] = users;
                            res.send(jsonObject);
                        }
                        else {
                            var jsonObject = {};
                            jsonObject["status"] = "0";
                            jsonObject["message"] = "No such Employee found in database";
                            jsonObject["data"] = [];
                            res.send(jsonObject);
                        }
                    } else {
                        var jsonObject = {};
                        jsonObject["status"] = "0";
                        jsonObject["message"] = "DB :" + err;
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
    } else {
        var jsonObject = {};
        jsonObject["status"] = "0";
        jsonObject["message"] = "user id is required";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }
}

function deleteEmployee(req, res) {
    var employee_id = req.body.employee_id;
    var status = req.body.status != undefined ? req.body.status : null;
    if (employee_id) {
        var sql = `update employee_master set status = `+status+` where id = `+employee_id+``;
        pool.getConnection(function (err1, con1) {
            if (!err1) {
                con1.query(sql, function (err, rows) {
                    if (!err) {
                        if (rows.affectedRows > 0) {
                            var jsonObject = {};
                            jsonObject["status"] = "1";
                            jsonObject["message"] = "Employee"+(status ? 'Activated':'Inactivated')+" Successfully";
                            jsonObject["data"] = employee_id;
                            res.send(jsonObject);
                        } else {
                            var jsonObject = {};
                            jsonObject["status"] = "0";
                            jsonObject["message"] = "No such Employee found in database";
                            jsonObject["data"] = [];
                            res.send(jsonObject);
                        }
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
        jsonObject["message"] = "employee_id is required";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }
}

function countEmployee(req, res) {
    var sql = `select count(id) as count from employee_master`;
    pool.getConnection(function (err1, con1) {
        if (!err1) {
            con1.query(sql, function (err, rows) {
                if (!err) {
                    var jsonObject = {};
                    jsonObject["status"] = "1";
                    jsonObject["message"] = "Count Found Successfully";
                    jsonObject["data"] = rows[0].count;
                    res.send(jsonObject);
                } else {
                    var jsonObject = {};
                    jsonObject["status"] = "0";
                    jsonObject["message"] = "DB Error: " + err;
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
}

function employeeByPg(req, res) {
    var page_no = parseInt(req.body.page_no);
    var items_per_page = parseInt(req.body.items_per_page);
    var data = (page_no - 1) * items_per_page;
    var offset = data + ',' + items_per_page;
    pool.query(`SELECT * FROM employee_master ORDER BY ID DESC LIMIT ` + offset, function (error, results) {
        if (error) {
            res.send({
                "status": 0,
                "message": error,
                "data": []
            })
        } else {
            var array = [];
            results.forEach(function (item) {
                array.push(item);
            });
            res.send({
                "status": 1,
                "message": "getEmployee sucessfull",
                "data": array
            });
        }
    });

    // pool.query(`select * from employee_master`, function (error, results) {
    //     if (error) {
    //         res.send({
    //             "status": 0,
    //             "message": error,
    //             "data": []
    //         })
    //     } else {
    //         console.log("results", results);
    //         res.send({
    //             "status": 1,
    //             "message": "getUses sucessfull",
    //             "data": results
    //         });
    //     }
    // });
        // var sql = `select * from employee_master`;
        // console.log("getEmployee sql ===> " + sql);
        // pool.getConnection(function (err1, con1) {
        //     if (!err1) {
        //         con1.query(sql, function (err, rows) {
        //             if (!err) {
        //                 var jsonObject = {};
        //                 jsonObject["status"] = "1";
        //                 jsonObject["message"] = rows.length + " Records found";
        //                 jsonObject["data"] = rows;
        //                 res.send(jsonObject);
        //             } else {
        //                 var jsonObject = {};
        //                 jsonObject["status"] = "0";
        //                 jsonObject["message"] = "DB :" + err;
        //                 jsonObject["data"] = [];
        //                 res.send(jsonObject);
        //             }
        //             con1.release();
        //         });
        //     } else {
        //         var jsonObject = {};
        //         jsonObject["status"] = "0";
        //         jsonObject["message"] = "CON :" + err1;
        //         jsonObject["data"] = [];
        //         res.send(jsonObject);
        //     }
        // });
}

function searchEmployeeData(req, res) {
    var sql = 'SELECT * FROM employee_master WHERE name LIKE "%' + req.body.searchkey + '%"';
    pool.query(sql, function (error, results) {
        if (error) {
            res.send({
                "status": 0,
                "message": error,
                "data": []
            })
        } else {
            res.send({
                "status": 1,
                "message": "Search Result Get Sucessfully",
                "data": results
            });
        }
    });
}

function uploadEmployeeIcon(req, res) {
    var file = req.files;
    if (!file) {
        var jsonObject = {};
        jsonObject["status"] = "0";
        jsonObject["message"] = "File was not found";
        jsonObject["data"] = [];
        res.send(jsonObject);
    } else {
        if (file.file_name.mimetype == 'image/png' ||
            file.file_name.mimetype == 'image/jpg' ||
            file.file_name.mimetype == 'image/jpeg' ||
            file.file_name.mimetype == 'image/webp' ||
            file.file_name.mimetype == 'image/bmp'
        ) {
            var splt_str = file.file_name.name.split(".");
            var last = (splt_str.length - 1);
            var ext_file_name = '';
            if (splt_str[last] != undefined && splt_str[last] != 'undefined') {
                ext_file_name = splt_str[last];
            } else {
                ext_file_name = splt_str[1];
            }
            var save_file_name = dates.generate_img_name(6) + '.' + ext_file_name;
            var path = "./Images/Employee/" + save_file_name;
            file.file_name.mv(path, function (err) {
                if (err) {
                    var jsonObject = {};
                    jsonObject["status"] = "0";
                    jsonObject["message"] = "File not saved";
                    jsonObject["data"] = [];
                    res.send(jsonObject);
                } else {
                    var jsonObject = {};
                    jsonObject["status"] = "1";
                    jsonObject["message"] = "File Uploaded Successfully!";
                    jsonObject["data"] = "Employee/" + save_file_name;
                    res.send(jsonObject);
                }
            });
        } else {
            var jsonObject = {};
            jsonObject["status"] = "0";
            jsonObject["message"] = "File type not valid";
            jsonObject["data"] = [];
            res.send(jsonObject);
        }
    }
}

function removeEmployeeIcon(req, res) {
    var localPath = dir.imgDir;
    var file_path = req.body.file_path ? req.body.file_path : null;
    if (file_path) {
        localPath += '/' + file_path;
        try {
            status = fs.existsSync(localPath, function (resss) {
                console.log('fs.existsSync', resss)
            });
            fs.unlink(localPath, function (ress) {
                console.log(ress);
            });
            var jsonObject = {};
            jsonObject["status"] = "1";
            jsonObject["message"] = "File Removed Successfully!..";
            jsonObject["data"] = file_path;
            res.send(jsonObject);
        } catch (e) {
            var jsonObject = {};
            jsonObject["status"] = "0";
            jsonObject["message"] = "Some Error : " + e;
            jsonObject["data"] = [];
            res.send(jsonObject);
        }
    } else {
        var jsonObject = {};
        jsonObject["status"] = "0";
        jsonObject["message"] = "Given File Not Found!";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }
}

function getViewEmployeeDetailsById(req, res) {
    var employee_id = req.body.employee_id ? req.body.employee_id : null;
    if (employee_id) {
        var sql = ` select 
                        c.*
                    from employee_master as c 
                    where 
                        c.id= ` + employee_id + `
                    limit 1`;
        console.log("getApplication sql ===> " + sql);
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
        jsonObject["message"] = "employee_id are required";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }
}

var checkDuplicateEmployee = function (email, number) {
    return new Promise(function (resolve) {
        var sql = `select count(id) as count from employee_master where personal_email in(` + email + `) OR contact_number in(` + number + `)`;
        console.log("checkDuplicateEmployee \r\n" + sql);
        pool.getConnection(function (err1, con1) {
            if (!err1) {
                con1.query(sql, function (err, rows) {
                    if (!err) {
                        var duplicate = 0;
                        if (rows &&
                            rows[0] &&
                            rows[0].count != undefined &&
                            rows[0].count != null &&
                            rows[0].count != 'null' &&
                            rows[0].count != undefined) {
                            duplicate = rows[0].count;
                        }
                        if (duplicate > 0) {
                            resolve({ status: 0, data: duplicate });
                        } else {
                            resolve({ status: 1, data: duplicate });
                        }
                    } else {
                        resolve({ status: 0, data: err });
                    }
                    con1.release();
                });
            } else {
                resolve({ status: 0, data: err1 });
            }
        });
    });
}

var createLogin = function (data) {
    return new Promise(function (resolve) {
        var hasString = data.id + "_" + data.personal_email;
        data.secret_key = dates.encode(hasString);
        if (data.personal_email && data.password) {
            var sql = `insert into user_master(
                    email_id,
                    password,
                    first_name,
                    mobile_no,
                    status,
                    avatar,
                    user_role_id,
                    secret_key
                ) values (
                    '`+ data.personal_email + `',
                    '`+ data.password + `',
                    '`+ data.name + `',
                    '`+ data.contact_number + `',
                    '`+ data.status + `',
                    '`+ data.add_image + `',
                    '`+ data.user_role_id + `',
                    '`+ data.secret_key + `'
                )`;
            console.log("createLogin sql ---------------> " + sql)
            pool.getConnection(function (err2, con2) {
                if (!err2) {
                    con2.query(sql, function (err3, rows1) {
                        console.log("row1", rows1);
                        con2.release();
                        if (!err3) {
                            resolve({ status: 1, data: rows1.insertId });
                        } else {
                            resolve({ status: 0, data: "DB " + err3 });
                        }
                    });
                } else {
                    resolve({ status: 0, data: "CON: " + err2 });
                }
            });
        } else {
            resolve({ status: 0, data: 'email and password are required!' });
        }
    })
}

var setSecretKey = function (data) {
    return new Promise((resolve) => {
        console.log("data", data);
        if (data.secret_key && data.id) {
            var sql = ` update user_master set secret_key = '` + data.secret_key + `'
                        where id = `+ data.user_id + ``;
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

var checkUsersEmail = function (email_id) {
    return new Promise(function (resolve) {
        var sql = ` SELECT
                        count(id) as count
                    FROM
                        users_master
                    WHERE
                        email_id ='`+ email_id + `'`;
        pool.getConnection(function (err1, con1) {
            if (!err1) {
                con1.query(sql, function (err, rows) {
                    if (!err) {
                        if (rows && rows[0] && rows[0].count != undefined) {
                            if (rows[0].count === 0) {
                                resolve({ status: 1, data: [] });
                            } else {
                                resolve({ status: 0, data: rows[0].count });
                            }
                        } else {
                            resolve({ status: 0, data: [] });
                        }
                    } else {
                        resolve({ status: 0, data: err });
                    }
                    con1.release();
                });
            } else {
                resolve({ status: 0, data: err1 });
            }
        });
    });
}


module.exports = router;