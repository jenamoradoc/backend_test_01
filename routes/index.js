var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'El Servidor Web  está ejecutándose...' });
});

/**************************************************************
**************************************************************/

var empleados = require('../controllers/empleados');
router.get('/gaweb/users', empleados.getAllUsers);
router.get('/gaweb/users/:id', empleados.getSingleUser);
router.get('/gaweb/users/:id', empleados.getSingleUserName);
router.post('/gaweb/createuser', empleados.createUser);
router.put('/gaweb/updateser', empleados.updateUser);
router.delete('/gaweb/usuarios/:id', empleados.removeUser);//Elimina el empleado correspondiente al id dado

//==============LOGIN==========================================
var log = require('../controllers/users');

router.post('/gAweb/loguear', log.loginUSer);
router.post('/gaweb/createuser', log.saveUSer);

//==========Mailer ============================================
var nodemailer = require('../mailer/mailer-module')

router.post('/gaweb/sendmail', nodemailer.SendMail);

//==========Upload files ========================================
var uploadfiles = require('../uploadfiles/dist/index')

router.post('/gaweb/profile', uploadfiles.profile);
//=============Roles ==========================================
var rol = require('../controllers/rol');

router.get('/gaweb/rol', rol.getAllRoles);
router.get('/gAweb/rol', rol.getSingleRol);

/**************************************************************
**************************************************************/

module.exports = router;

//nada que ver de aqui para abajo solo estoy probando -->
