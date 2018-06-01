var express = require('express');
var router = express.Router();
var middleware = require('../middleware/authentication'); // middleware por donde pasa la autenticacion antes de hacer un servicio

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'El Servidor Web  está ejecutándose...' });
});

/**************************************************************
**************************************************************/

//==============LOGIN==========================================
var log = require('../controllers/users');

router.post('/gAweb/loguear', log.loginUser);

//==========Mailer ============================================
var nodemailer = require('../mailer/mailer-module')

router.post('/gaweb/sendmail', nodemailer.SendMail);

//==========Get files ========================================
var getFiles = require('../uploadfiles/files');

router.get('/gaweb/getFiles',  getFiles.getAllFiles);


/*****************************************************
 * A partir de aqui se implementa un middleware 
 * el cual solicita un token de autenticacion
*****************************************************/

//========= CRUD Users ==========================================

var empleados = require('../controllers/empleados');

router.get('/gaweb/users', middleware.ensureAuthenticated, empleados.getAllUsers);
router.get('/gaweb/users/:id', middleware.ensureAuthenticated, empleados.getSingleUser);
router.post('/gaweb/createuser', middleware.ensureAuthenticated, empleados.createUser);
router.put('/gaweb/updateser', middleware.ensureAuthenticated, empleados.updateUser);
router.delete('/gaweb/delete/:id', middleware.ensureAuthenticated, empleados.removeUser)//Elimina el empleado correspondiente al id dado
router.post('/gaweb/changePassword', middleware.ensureAuthenticated, empleados.changePassword); //Cambio de contraseña
router.post('/gaweb/resetPassword', middleware.ensureAuthenticated, empleados.resetPassword); //blankeo de contraseña

//==========Upload files ========================================
var uploadfiles = require('../uploadfiles/files')

router.post('/gaweb/profile', middleware.ensureAuthenticated, uploadfiles.createfile);
router.post('/gaweb/uploadMedia', middleware.ensureAuthenticated, uploadfiles.uploadMedia);

//=============Roles ==========================================
var rol = require('../controllers/rol');

router.get('/gaweb/rol', middleware.ensureAuthenticated, rol.getAllRoles);
router.get('/gAweb/rol', middleware.ensureAuthenticated, rol.getSingleRol);

/**************************************************************
**************************************************************/

module.exports = router;

//nada que ver de aqui para abajo solo estoy probando -->
