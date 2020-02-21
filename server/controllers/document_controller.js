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
router.post('/createDocument', createDocument);
router.post('/getDocumentById', getDocumentById);
router.post('/updateDocument', updateDocument);
router.post('/deleteDocument', deleteDocument);
router.post('/createDocumentImage', createDocumentImage);
router.post('/removeDocumentImage', removeDocumentImage);
router.post('/removeAdharCardBackDocumentImage', removeAdharCardBackDocumentImage);
router.post('/removePancardDocumentImage', removePancardDocumentImage);
router.post('/removePassportDocumentImage', removePassportDocumentImage);
router.post('/removePassportPhotoDocumentImage', removePassportPhotoDocumentImage);
router.post('/removeOriginalCertificateDocumentImage', removeOriginalCertificateDocumentImage);
router.post('/removeBankStatementDocumentImage', removeBankStatementDocumentImage);
router.post('/removeLeavingLetterDocumentImage', removeLeavingLetterDocumentImage);

function createDocument(req, res) {
    var user = {
        id: req.body.id ? req.body.id : null,
        adhar_card_front: req.body.adhar_card_front ? req.body.adhar_card_front : null,
        adhar_card_back: req.body.adhar_card_back ? req.body.adhar_card_back : null,
        pan_card: req.body.pan_card ? req.body.pan_card : null,
        passport_photo: req.body.passport_photo ? req.body.passport_photo : null,
        passport: req.body.passport ? req.body.passport : null,
        leaving_letter: req.body.leaving_letter ? req.body.leaving_letter : null,
        original_certificate: req.body.original_certificate ? req.body.original_certificate : null,
        bank_statement: req.body.bank_statement ? req.body.bank_statement : null,
        employee_id: req.body.employee_id ? req.body.employee_id : null,
    };

    if (user.employee_id) {
        var sql = `insert into document_master(
        adhar_card_front,
        adhar_card_back,
        pan_card,
        passport_photo,
        passport,
        leaving_letter,
        original_certificate,
        bank_statement,
        employee_id
    ) values (
        '`+ user.adhar_card_front + `',
        '`+ user.adhar_card_back + `',
        '`+ user.pan_card + `',
        '`+ user.passport_photo + `',
        '`+ user.passport + `',
        '`+ user.leaving_letter + `',
        '`+ user.original_certificate + `',
        '`+ user.bank_statement + `',
        '`+ user.employee_id + `'
    )`;
        console.log("createDocument sql ---------------> " + sql)
        pool.getConnection(function (err2, con2) {
            if (!err2) {
                con2.query(sql, function (err3, rows1) {
                    if (!err3) {
                        var jsonObject = {};
                        jsonObject["status"] = "1";
                        jsonObject["message"] = "Employee Document Created Successfully";
                        jsonObject["data"] = rows1.insertId;
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
    } else {
        var jsonObject = {};
        jsonObject["status"] = "0";
        jsonObject["message"] = "employee id are required";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }

}

function getDocumentById(req, res) {
    var employee_id = req.body.employee_id ? req.body.employee_id : null;
    if (employee_id) {
        var sql = ` select 
                        c.*
                    from document_master as c 
                    where 
                        c.employee_id= ` + employee_id + `
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
        jsonObject["message"] = "employee_id are required";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }
}

function updateDocument(req, res) {
    var user = {
        id: req.body.id ? req.body.id : null,
        adhar_card_front: req.body.adhar_card_front ? req.body.adhar_card_front : null,
        adhar_card_back: req.body.adhar_card_back ? req.body.adhar_card_back : null,
        pan_card: req.body.pan_card ? req.body.pan_card : null,
        passport_photo: req.body.passport_photo ? req.body.passport_photo : null,
        passport: req.body.passport ? req.body.passport : null,
        leaving_letter: req.body.leaving_letter ? req.body.leaving_letter : null,
        original_certificate: req.body.original_certificate ? req.body.original_certificate : null,
        bank_statement: req.body.bank_statement ? req.body.bank_statement : null,
        employee_id: req.body.employee_id ? req.body.employee_id : null,
    };
    if (user.id) {
        var sql1 = `update document_master set 
                        adhar_card_front = '`+ user.adhar_card_front + `',
                        adhar_card_back = '`+ user.adhar_card_back + `',
                        pan_card = '`+ user.pan_card + `',
                        passport_photo = '`+ user.passport_photo + `',
                        passport = '`+ user.passport + `',
                        leaving_letter = '`+ user.leaving_letter + `',
                        original_certificate = '`+ user.original_certificate + `',
                        bank_statement = '`+ user.bank_statement + `',
                        employee_id = '`+ user.employee_id + `'
                    where id = ` + user.id;
        console.log("updateDocument sql \r\r\n\n" + sql1)
        pool.getConnection(function (err2, con2) {
            if (!err2) {
                con2.query(sql1, function (err, rows1) {
                    if (!err) {
                        if (rows1.affectedRows > 0) {
                            var jsonObject = {};
                            jsonObject["status"] = "1";
                            jsonObject["message"] = "Document Updated Successfully";
                            jsonObject["data"] = user;
                            res.send(jsonObject);
                        }
                        else {
                            var jsonObject = {};
                            jsonObject["status"] = "0";
                            jsonObject["message"] = "No such Document found in database";
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
        jsonObject["message"] = "document_id is required";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }
}

function deleteDocument(req, res) {
    var document_id = req.body.document_id
    if (document_id) {
        var sql = `DELETE from document_master WHERE ID = ` + document_id + ``;
        pool.getConnection(function (err1, con1) {
            if (!err1) {
                con1.query(sql, function (err, rows) {
                    if (!err) {
                        if (rows.affectedRows > 0) {
                            var jsonObject = {};
                            jsonObject["status"] = "1";
                            jsonObject["message"] = "Document Deleted Successfully";
                            jsonObject["data"] = document_id;
                            res.send(jsonObject);
                        } else {
                            var jsonObject = {};
                            jsonObject["status"] = "0";
                            jsonObject["message"] = "No such Document found in database";
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
        jsonObject["message"] = "document_id is required";
        jsonObject["data"] = [];
        res.send(jsonObject);
    }
}

function createDocumentImage(req, res) {
    var file = req.files;
    if (!file) {
        var jsonObject = {};
        jsonObject["status"] = "0";
        jsonObject["message"] = "File was not found";
        jsonObject["data"] = [];
        res.send(jsonObject);
    } else {
        if (req.url == '/createDocumentImage' && req.method.toLowerCase() == 'post') {
            if (file.file_name.mimetype == 'image/jpeg' || file.file_name.mimetype == 'image/jpg' || file.file_name.mimetype == 'image/png' || file.file_name.mimetype == 'image/gif' || file.file_name.mimetype == 'image/bmp') {
                var splt_str = file.file_name.name.split(".");
                var last = (splt_str.length - 1);
                var ext_file_name = '';
                if (splt_str[last] != undefined && splt_str[last] != 'undefined') {
                    ext_file_name = splt_str[last].trim();
                } else {
                    ext_file_name = splt_str[1].trim();
                }
                var save_file_name = dates.generate_img_name(6) + '.' + ext_file_name;
                var path = "./Images/Document/" + save_file_name.trim();
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
                        jsonObject["data"] = "Document/" + save_file_name;
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
}

function removeDocumentImage(req, res) {
    var localPath = dir.imgDir;
    var file_path = req.body.file_path ? req.body.file_path : null;
    console.log("file_path =================> " + file_path)
    if (file_path) {
        localPath += '/' + file_path;
        try {
            status = fs.existsSync(localPath, function (resss) {
                console.log('fs.existsSync', resss)
            });
            fs.unlink(localPath, function (ress) {
                console.log(ress);
            });
            var sql = `update document_master set adhar_card_front = '' where employee_id =` + req.body.employee_id;
            pool.getConnection(function (err1, con1) {
                if (!err1) {
                    con1.query(sql, function (err, rows) {
                        if (!err) {
                            if (rows.affectedRows > 0) {
                                var jsonObject = {};
                                jsonObject["status"] = "1";
                                jsonObject["message"] = "File Removed Successfully!..";
                                jsonObject["data"] = file_path;
                                res.send(jsonObject);
                            } else {
                                var jsonObject = {};
                                jsonObject["status"] = "0";
                                jsonObject["message"] = "Something went wrong please try again later!...";
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

function removeAdharCardBackDocumentImage(req, res) {
    var localPath = dir.imgDir;
    var file_path = req.body.file_path ? req.body.file_path : null;
    console.log("file_path =================> " + file_path)
    if (file_path) {
        localPath += '/' + file_path;
        try {
            status = fs.existsSync(localPath, function (resss) {
                console.log('fs.existsSync', resss)
            });
            fs.unlink(localPath, function (ress) {
                console.log(ress);
            });
            var sql = `update document_master set adhar_card_back = '' where employee_id =` + req.body.employee_id;
            pool.getConnection(function (err1, con1) {
                if (!err1) {
                    con1.query(sql, function (err, rows) {
                        if (!err) {
                            if (rows.affectedRows > 0) {
                                var jsonObject = {};
                                jsonObject["status"] = "1";
                                jsonObject["message"] = "File Removed Successfully!..";
                                jsonObject["data"] = file_path;
                                res.send(jsonObject);
                            } else {
                                var jsonObject = {};
                                jsonObject["status"] = "0";
                                jsonObject["message"] = "Something went wrong please try again later!...";
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

function removePancardDocumentImage(req, res) {
    var localPath = dir.imgDir;
    var file_path = req.body.file_path ? req.body.file_path : null;
    console.log("file_path =================> " + file_path)
    if (file_path) {
        localPath += '/' + file_path;
        try {
            status = fs.existsSync(localPath, function (resss) {
                console.log('fs.existsSync', resss)
            });
            fs.unlink(localPath, function (ress) {
                console.log(ress);
            });
            var sql = `update document_master set pan_card = '' where employee_id =` + req.body.employee_id;
            pool.getConnection(function (err1, con1) {
                if (!err1) {
                    con1.query(sql, function (err, rows) {
                        if (!err) {
                            if (rows.affectedRows > 0) {
                                var jsonObject = {};
                                jsonObject["status"] = "1";
                                jsonObject["message"] = "File Removed Successfully!..";
                                jsonObject["data"] = file_path;
                                res.send(jsonObject);
                            } else {
                                var jsonObject = {};
                                jsonObject["status"] = "0";
                                jsonObject["message"] = "Something went wrong please try again later!...";
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

function removePassportDocumentImage(req, res) {
    var localPath = dir.imgDir;
    var file_path = req.body.file_path ? req.body.file_path : null;
    console.log("file_path =================> " + file_path)
    if (file_path) {
        localPath += '/' + file_path;
        try {
            status = fs.existsSync(localPath, function (resss) {
                console.log('fs.existsSync', resss)
            });
            fs.unlink(localPath, function (ress) {
                console.log(ress);
            });
            var sql = `update document_master set passport = '' where employee_id =` + req.body.employee_id;
            pool.getConnection(function (err1, con1) {
                if (!err1) {
                    con1.query(sql, function (err, rows) {
                        if (!err) {
                            if (rows.affectedRows > 0) {
                                var jsonObject = {};
                                jsonObject["status"] = "1";
                                jsonObject["message"] = "File Removed Successfully!..";
                                jsonObject["data"] = file_path;
                                res.send(jsonObject);
                            } else {
                                var jsonObject = {};
                                jsonObject["status"] = "0";
                                jsonObject["message"] = "Something went wrong please try again later!...";
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

function removePassportPhotoDocumentImage(req, res) {
    var localPath = dir.imgDir;
    var file_path = req.body.file_path ? req.body.file_path : null;
    console.log("file_path =================> " + file_path)
    if (file_path) {
        localPath += '/' + file_path;
        try {
            status = fs.existsSync(localPath, function (resss) {
                console.log('fs.existsSync', resss)
            });
            fs.unlink(localPath, function (ress) {
                console.log(ress);
            });
            var sql = `update document_master set passport_photo = '' where employee_id =` + req.body.employee_id;
            pool.getConnection(function (err1, con1) {
                if (!err1) {
                    con1.query(sql, function (err, rows) {
                        if (!err) {
                            if (rows.affectedRows > 0) {
                                var jsonObject = {};
                                jsonObject["status"] = "1";
                                jsonObject["message"] = "File Removed Successfully!..";
                                jsonObject["data"] = file_path;
                                res.send(jsonObject);
                            } else {
                                var jsonObject = {};
                                jsonObject["status"] = "0";
                                jsonObject["message"] = "Something went wrong please try again later!...";
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

function removeOriginalCertificateDocumentImage(req, res) {
    var localPath = dir.imgDir;
    var file_path = req.body.file_path ? req.body.file_path : null;
    console.log("file_path =================> " + file_path)
    if (file_path) {
        localPath += '/' + file_path;
        try {
            status = fs.existsSync(localPath, function (resss) {
                console.log('fs.existsSync', resss)
            });
            fs.unlink(localPath, function (ress) {
                console.log(ress);
            });
            var sql = `update document_master set original_certificate = '' where employee_id =` + req.body.employee_id;
            pool.getConnection(function (err1, con1) {
                if (!err1) {
                    con1.query(sql, function (err, rows) {
                        if (!err) {
                            if (rows.affectedRows > 0) {
                                var jsonObject = {};
                                jsonObject["status"] = "1";
                                jsonObject["message"] = "File Removed Successfully!..";
                                jsonObject["data"] = file_path;
                                res.send(jsonObject);
                            } else {
                                var jsonObject = {};
                                jsonObject["status"] = "0";
                                jsonObject["message"] = "Something went wrong please try again later!...";
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

function removeBankStatementDocumentImage(req, res) {
    var localPath = dir.imgDir;
    var file_path = req.body.file_path ? req.body.file_path : null;
    console.log("file_path =================> " + file_path)
    if (file_path) {
        localPath += '/' + file_path;
        try {
            status = fs.existsSync(localPath, function (resss) {
                console.log('fs.existsSync', resss)
            });
            fs.unlink(localPath, function (ress) {
                console.log(ress);
            });
            var sql = `update document_master set bank_statement = '' where employee_id =` + req.body.employee_id;
            pool.getConnection(function (err1, con1) {
                if (!err1) {
                    con1.query(sql, function (err, rows) {
                        if (!err) {
                            if (rows.affectedRows > 0) {
                                var jsonObject = {};
                                jsonObject["status"] = "1";
                                jsonObject["message"] = "File Removed Successfully!..";
                                jsonObject["data"] = file_path;
                                res.send(jsonObject);
                            } else {
                                var jsonObject = {};
                                jsonObject["status"] = "0";
                                jsonObject["message"] = "Something went wrong please try again later!...";
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

function removeLeavingLetterDocumentImage(req, res) {
    var localPath = dir.imgDir;
    var file_path = req.body.file_path ? req.body.file_path : null;
    console.log("file_path =================> " + file_path)
    if (file_path) {
        localPath += '/' + file_path;
        try {
            status = fs.existsSync(localPath, function (resss) {
                console.log('fs.existsSync', resss)
            });
            fs.unlink(localPath, function (ress) {
                console.log(ress);
            });
            var sql = `update document_master set leaving_letter = '' where employee_id =` + req.body.employee_id;
            pool.getConnection(function (err1, con1) {
                if (!err1) {
                    con1.query(sql, function (err, rows) {
                        if (!err) {
                            if (rows.affectedRows > 0) {
                                var jsonObject = {};
                                jsonObject["status"] = "1";
                                jsonObject["message"] = "File Removed Successfully!..";
                                jsonObject["data"] = file_path;
                                res.send(jsonObject);
                            } else {
                                var jsonObject = {};
                                jsonObject["status"] = "0";
                                jsonObject["message"] = "Something went wrong please try again later!...";
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

module.exports = router;    