var express = require('express');
var router = express.Router();
/* Services */
var mail = require('../services/mail.service');
var charge = require('../services/charge.service');
var auth = require('../services/auth.service');
var talentlms = require('../services/talentlms.service');

/* sire routes */
function getCopyrightDate(req, res){
    try {
        var d = new Date();
        res.status(200).json({"errorMessage":null, "results":d.getFullYear() });
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }
}

/* emails */
function sendEmail(req, res){ 
    try {
        var emailInfo = req.body;

        mail.sendEmail(emailInfo, function(ret){
            res.status(200).json(ret);
        });
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }
}
function sendAppEmail(req, res){ mail.sendAppEmail(req, res); }

/* charges */
function applicationCharge(req, res){ 
    try {
        var chargeInfo = req.body;

        charge.applicationCharge(chargeInfo, function(ret){
            res.status(200).json(ret);
        });
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request (AC1): " + ex, "results":null });
    }
}

function accountCharge(req, res){
    try {
        var userInfo = req.body.userInfo;
        var chargeInfo = req.body.chargeInfo;

        charge.accountCharge(userInfo, chargeInfo, function(ret){
            res.status(200).json(ret);
        });
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request (AC2) : " + ex, "results":null });
    }
}

function searchUserTransactions(req,res){
    try {
        var requestUser = req.body.requestUser;
        var userInfo = req.body.userInfo;
        userInfo.full = true;

        // Validate User
        auth.authorizeUser(requestUser, userInfo._id, function(ret){
            if(ret.errorMessage != null) {
                res.status(200).json(ret);
            }
            else if(!ret.results) {
                res.status(200).json({"errorMessage":"User status invalid for this request (SU1)", "results":null});
            }
            else {                
                charge.getUserTransactions(userInfo, function(searchRet) {
                    res.status(200).json(searchRet);
                });                    
            }
        });  
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request (SU1): " + ex, "results":null });
    }    
}

/* user auth */
function createUser(req, res){
    try {
        var requestUser = req.body.requestUser;
        var userInfo = req.body.userInfo;

        // Validate User (Admin Only)
        auth.authorizeUser(requestUser, null, function(ret){
            if(ret.errorMessage != null) {
                res.status(200).json(ret);
            }
            else if(!ret.results) {
                res.status(200).json({"errorMessage":"User status invalid for this request", "results":null});
            }
            else {
                auth.createUser(userInfo, function(userRet){
                    res.status(200).json(userRet);
                });
            }
        });    
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }      
}

function updateUser(req, res){
    try {
        var requestUser = req.body.requestUser;
        var userInfo = req.body.userInfo;

        // Validate User
        auth.authorizeUser(requestUser, userInfo._id, function(ret){
            if(ret.errorMessage != null) {
                res.status(200).json(ret);
            }
            else if(!ret.results) {
                res.status(200).json({"errorMessage":"User status invalid for this request", "results":null});
            }
            else {
                auth.updateUser(userInfo, function(userRet){
                    res.status(200).json(userRet);
                });
            }
        }); 
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }        
}

function userSearch(req, res){
    try {
        var requestUser = req.body.requestUser;
        var searchInfo = req.body.searchInfo;

        // Validate User (Admin Only)
        auth.authorizeUser(requestUser, null, function(ret){
            if(ret.errorMessage != null) {
                res.status(200).json(ret);
            }
            else if(!ret.results) {
                res.status(200).json({"errorMessage":"User status invalid for this request", "results":null});
            }
            else {
                auth.userSearch(searchInfo, function(userRet){
                    res.status(200).json(userRet);
                });
            }
        });  
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }       
}

function getUserById(req, res){
    try {
        var requestUser = req.body.requestUser;
        var userInfo = req.body.userInfo;

        // Validate User
        auth.authorizeUser(requestUser, userInfo._id, function(ret){
            if(ret.errorMessage != null) {
                res.status(200).json(ret);
            }
            else if(!ret.results) {
                res.status(200).json({"errorMessage":"User status invalid for this request", "results":null});
            }
            else {
                auth.getUserById(userInfo, function(userRet){
                    res.status(200).json(userRet);
                });
            }
        });    
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }  
}

function generateStudentId(req, res){
    try {
        var requestUser = req.body.requestUser;    
        var userInfo = req.body.userInfo;

        // Validate User
        auth.authorizeUser(requestUser, userInfo._id, function(ret){
            if(ret.errorMessage != null) {
                res.status(200).json(ret);
            }
            else if(!ret.results) {
                res.status(200).json({"errorMessage":"User status invalid for this request", "results":null});
            }
            else {
                auth.generateStudentId(userInfo, function(genRet){
                    res.status(200).json(genRet);
                });
            }
        });  
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }
}

/* TalentLMS */
function createTLMSUser(req, res){
    try {
        var requestUser = req.body.requestUser;    
        var userInfo = req.body.userInfo;

        // Validate User
        auth.authorizeUser(requestUser, null, function(ret){
            if(ret.errorMessage != null) {
                res.status(200).json(ret);
            }
            else if(!ret.results) {
                res.status(200).json({"errorMessage":"User status invalid for this request", "results":null});
            }
            else {
                talentlms.signup(userInfo, function(signRet){
                    res.status(200).json(signRet);
                });
            }
        });  
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }
}

function userLogin(req, res){    
    try {
        var loginInfo = req.body.loginInfo;
        
        talentlms.signin(loginInfo, function(ret){
            res.status(200).json(ret);
        });
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }
}

function getTLMSUserById(req, res){
    try {
        var requestUser = req.body.requestUser;    
        var userInfo = req.body.userInfo;

        // Validate User
        auth.authorizeUser(requestUser, userInfo._id, function(ret){
            if(ret.errorMessage != null) {
                res.status(200).json(ret);
            }
            else if(!ret.results) {
                res.status(200).json({"errorMessage":"User status invalid for this request", "results":null});
            }
            else {            
                talentlms.getUserById(userInfo, function(userRet){
                    res.status(200).json(userRet);
                });
            }
        }); 
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }
}

function getCourses(req, res){
    try {
        talentlms.getCourses(function(ret){
            res.status(200).json(ret);
        });
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }
}

function courseRegister(req, res){
    try {
        var requestUser = req.body.requestUser;
        var userInfo = req.body.userInfo;
        var courseInfo = req.body.courseInfo;

        // Validate User
        auth.authorizeUser(requestUser, userInfo._id, function(ret){
            if(ret.errorMessage != null) {
                res.status(200).json(ret);
            }
            else if(!ret.results) {
                res.status(200).json({"errorMessage":"User status invalid for this request", "results":null});
            }
            else {            
                talentlms.courseRegister(userInfo, courseInfo,function(courseRet){
                    if(courseRet.errorMessage){
                        //Send error email
                        mail.sendEmail({ email: "admin@lenkesongcu.org", title:"Registration Error", formData:{}, additionalData:{},
                            subject:"Unable to Register student for course [ID]: "+courseInfo.id +" [student Id]:"+userInfo.studentId+" Error: "+ courseRet.errorMessage
                            }, function(mailRet){});
                    }
            
                    res.status(200).json(courseRet);
                });
            }
        }); 
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }
}

function courseUnregister(req, res){
    try {
        var requestUser = req.body.requestUser;
        var userInfo = req.body.userInfo;
        var courseInfo = req.body.courseInfo;

        // Validate User
        auth.authorizeUser(requestUser, userInfo._id, function(ret){
            if(ret.errorMessage != null) {
                res.status(200).json(ret);
            }
            else if(!ret.results) {
                res.status(200).json({"errorMessage":"User status invalid for this request", "results":null});
            }
            else {            
                talentlms.courseUnregister(userInfo, courseInfo, function(courseRet){
                    res.status(200).json(courseRet);
                });
            }
        });    
    }
    catch(ex){
        res.status(200).json({"errorMessage":"Error Processing Request: " + ex, "results":null });
    }  
}

/*** Routes ***/
/* Site Routes */
router.get('/getCopyrightDate', getCopyrightDate);

/* TalentLMS */
router.post('/createTLMSUser', createTLMSUser);
router.post('/userLogin', userLogin);
router.post('/getTLMSUserById', getTLMSUserById);
router.get('/getCourses', getCourses);
router.post('/courseRegister', courseRegister);
router.post('/courseUnregister', courseUnregister);

/* User Auth */
router.post('/createUser', createUser);
router.post('/updateUser', updateUser);
router.post('/userSearch', userSearch);
router.post('/getUserById', getUserById);
router.post('/generateStudentId', generateStudentId);

/* Emails */
router.post('/sendEmail', sendEmail);
router.post('/sendAppEmail', sendAppEmail);

/* Charge */
router.post('/applicationCharge', applicationCharge);
router.post('/accountCharge', accountCharge);
router.post('/searchUserTransactions',searchUserTransactions);

module.exports = router;