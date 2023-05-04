const { request } = require('express');
const express = require('express');
const route = express.Router();

const verify = require('../../Middleware/authentication');
const control = require('../control/controller');
route.post('/user/login', control.ulogin)
route.post('/user/login/logout', verify, control.ulogout);
route.post('/user/registration', control.patReg);
route.post('/doctor/login', control.dlogin)
route.post('/doctor/login/logout', verify, control.dlogout);
route.post('/doctor/registration', control.docReg);
route.post('/user/home',verify,control.userhome)
route.post('/doctor/home',verify,control.dochome)
route.post('/user/medhistory',verify,control.medhis)
route.post('/user/test',verify,control.selfcheck) 
route.get('/user/appoint',verify,control.appoint) 
route.post('/user/bookappoin',verify,control.docappoint)
route.post('/user/showappoin',verify,control.showAppoint)
route.post('/doctor/showappoin',verify,control.showAppointtodoc)
route.post('/doctor/sendreport',verify,control.sendreport)
route.get('/doctor',verify,control.pathis)
route.get('/doctor/search/:name',verify,control.search)
route.put('/doctor/updateavl',verify,control.updateavl)
route.get('/ordermedicine',control.medicinelist)
route.get('/ordermedicine/:title',control.getonemedicine)
route.post('/sendmail',control.sendmail)

module.exports = route;











