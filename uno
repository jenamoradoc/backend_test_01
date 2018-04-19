'use strict'

var bcrypt = require('bcrypt-nodejs');
var User   = require('../db');
var jwt = require('../services/jwt');

/*function logindb(user, pass, callback) {
  db.one('select * from '+ dbConfig.schema + '.empleados where usuario = $1', users)
    .then(function(data){
        callback(data);
    })
    .catch(function(err) {
        callback(err.received); //devuelve 0
    });
}*/

/* endpoint */


/*function loginUser(req, res){

  var params = req.body;

  var username = params.user;
  var password = params.pass;
*/

function loginUser(req, res){

  	//recuerden que los parametros del post los toman del body
  	var email = req.body.email;
  	var password = req.body.password;

  	modelos.Usuario.find({
  		where : {
  			//LO SIGUIENTE ES EQUIVALENTE HACER UNA OPERACION SQL CON UN WHERE Y UN AND
  			email : email,
  			password : password
  		}
  	}).success(function(usuarioEncontrado) {

  		//el usuario con ese password y ese email NO EXISTEN!!
  		if (usuarioEncontrado === null) {
  			//si no existe el usuario le mostramos otra la vista de login.html
  			res.send({
          message: 'success'
  				error : true
  			});

  		} else {
  			//ese usuario si existe
  			//CREAMOS UNA SESION EN EL SERVIDOR

  			req.session.usuarioLogeado = {
  				id : usuarioEncontrado.id,
  				email : usuarioEncontrado.email
  			};

  			res.send("usuario logeado correctamente!!");
  		}

  	});

  });


module.exports = {

  loginUser,
};
