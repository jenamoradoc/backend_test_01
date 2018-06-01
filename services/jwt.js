
'use strict'
//jwt services

var jwt = require('jwt-simple');
var moment = require('moment'); //Se utiliz para fijar las fechas y tiempo
var config = require('./config'); 

exports.createToken = function(user){
    console.log('entro a la nueva generacion de token');
    
	var payload = {
		username: user.username,
		mail:user.mail,
		iat: moment().unix(), //fecha de creacion del token
		exp: moment().add(14, 'days').unix //expiracion token
	};
	return jwt.encode(payload, config.TOKEN_SECRET); //Utiliza config y toma la clave secreta de alli --> genera clave secreta para el gethash
}

























/* strict'
//service of jwt

var jwt    = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = function(user){
    var secret = {
        sub: user.id,
        name : user.username,
        iat: moment().unix(),
        exp: moment().add(12, "days").unix()
    };
    console.log('llama al metodo de jwt');
    
    console.log(secret);
    
    return jwt.encode(payload, secret);
};*/


/*
var jwt = require('jwt-simple');
var moment = require('moment')
var payload = { foo: 'bar' };
var secret = 'clave_secreta';

// HS256 secrets are typically 128-bit random strings, for example hex-encoded:
// var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex')

// encode
var token = jwt.encode(payload, secret);

// decode
var decoded = jwt.decode(token, secret);
console.log(decoded); //=> { foo: 'bar' }*/
