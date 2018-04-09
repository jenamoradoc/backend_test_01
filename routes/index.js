var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'El Servidor Web  está ejecutándose...' });
});

var empleados = require('../controllers/empleados');
router.get('/gAweb/empleados', empleados.getAllUsers);
router.get('/gAweb/empleados/:usuario', empleados.getSingleUser);
router.post('/gAweb/empleados', empleados.createUser);
router.put('/gAweb/empleados', empleados.updateUser);
router.delete('/gAweb/empleados', empleados.removeUser);

var log = require('../controllers/usuario');

router.post('/gAweb/loguear', log.loginUser);

module.exports = router;
