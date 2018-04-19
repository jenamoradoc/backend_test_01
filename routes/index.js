var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'El Servidor Web  está ejecutándose...' });
});

var empleados = require('../controllers/empleados');
router.get('/gaweb/usuarios', empleados.getAllUsers); //muestra todos los usuarios
router.get('/gaweb/usuarios/:id', empleados.getSingleUser);//muestra un solo usuario
router.post('/gaweb/createuser', empleados.saveUSer);//crea un nuevo usuario
router.put('/gaweb/update', empleados.updateUser);// actualiza un usuario
router.delete('/gaweb/usuarios/:id', empleados.removeUser);//Elimina el empleado correspondiente al id dado

//============Login===========================================
var log = require('../controllers/user');
router.post('/gaweb/loguear', log.loginUser);

//============Send Mail=======================================
var nodemailer = require('../mailer/mailer-module')
router.post('/gaweb/sendmail', nodemailer.SendMail);




module.exports = router;

//nada que ver de aqui para abajo solo estoy probando -->
