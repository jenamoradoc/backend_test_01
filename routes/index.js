var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'El Servidor Web  está ejecutándose...' });
});

var empleados = require('../controllers/empleados');
router.get('/gaweb/usuarios', empleados.getAllUsers);
router.get('/gaweb/usuarios/:usuario', empleados.getSingleUser);
router.post('/gaweb/usuarios', empleados.createUser);
router.put('/gaweb/usuarios', empleados.updateUser);
router.delete('/gaweb/usuarios', empleados.removeUser);

var log = require('../controllers/usuario');

router.post('/gAweb/loguear', log.login);

module.exports = router;

//nada que ver de aqui para abajo solo estoy probando -->
