'use strict'

var jwt = require('../services/jwt');
var db = require('../db');
var config = require('config');
var dbConfig = config.get('dbConfig');

//================ Log of users ======================

/*function logdb(){
  return new Promise((resolve, reject) =>{
    db.one('select * from '+ dbConfig.schema + '.usuarios where usuario = $1', users)
    .then(function(data){
        resolve(data);
    })
    .catch(function(err){
        reject(err);
    });
  });
}*/

function logdb(user, pass, callback) {
  db.one('select * from '+ dbConfig.schema + '.usuarios where usuario = $1',user)
    .then(function(data){
        resolve(data);
    })
    .catch(function(err) {
        callback(err.received); //devuelve 0
    });
}

//================== authentication ==============
function login(req, res){
  var params = req.body;

  var username = params.user;
  var password = params.pass;

  logindb(params.user, params.pass, function(data){
      if(err){
        res.status(500).send({message: 'Error en la peticion'});
      }else{
        if(!user){
          res.status(404).send({message: 'El usuario no existe'});
        }else{

          //comprobar la comtraseña
          bcrypt.compare(password, user.password, function (err, check) {
            if(check){
              //devolver los datos del usuario logueado
              if(params.gethash){
                //devolver un token de jwt
                res.status(200).send({
                  token: jwt.createToken(user)
                });
              }else{
                res.status(200).send({user});
              }
            }else{
              res.status(404).send({message: 'El usuario no ha podido logearse '+check})
            }
          });
        }
      }
    });
}


/*function loginUSer(req, res){
      var params  = req.body;

      var email = params.email;
      var password = params.password;

      User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
          res.status(500).send({message: 'Error en la peticion'});
        }else{
          if(!user){
            res.status(404).send({message: 'El usuario no existe'});
          }else{

            //comprobar la comtraseña
            bcrypt.compare(password, user.password, function (err, check) {
              if(check){
                //devolver los datos del usuario logueado
                if(params.gethash){
                  //devolver un token de jwt
                  res.status(200).send({
                    token: jwt.createToken(user)
                  });
                }else{
                  res.status(200).send({user});
                }
              }else{
                res.status(404).send({message: 'El usuario no ha podido logearse '+check})
              }
            });
          }
        }
      });
 }*/

module.exports = {
  login,
};
