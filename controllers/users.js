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

//================== create user ==============
/*
function saveUSer(req, res, next){
  var user ={
    id_user:req.body.id_user,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    role_id:req.body.role_id,
    active:req.body.active,
    password:req.body.password
  };
  insertar(user, function(data){
    res.send({data: data});
  });

}

function insertar(user, callback){
  db.none('insert int' + dbConfig.schema + '.users(id_user,firstname, lastname, role_id, active, password)' +
    'values($1, $2, $3, $4, $5, $6)',
    [user.id_user,user.firstname, user.lastname, user.role_id, user.active, user.password]
    if(user.password){
      //Encriptar contraseña
      bcrypt.hash(user.password, function(err, hash){
        //Guardar el usuario
        user.password=hash;

        if (user.id_user != null && user.firstname ! = null && user.lastname !=null && user.role_id !=null && user.active !=null ){
          user.save((err, data)=> {
            if (err){
              res.status(500).send({message:'Error al guardar el usuario'});
            }else{
              if(!userStored){
                res.status(404).send({message:'No se ha registrado con exito'})
              }else{
                var data = 'Inserción exitosa';
                callback(user:data);
              }
            }
          });
        }
      })
    }
  )
}

 function loginUSer(req, res){
      var params  = req.body;

      var id_user = params.id_user;
      var password = params.password;

      User.findOne({id_user: id_user.toLowerCase()}, (err, user) => {
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
*/

function saveUSer(req, res){
    var user = new User();

    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if (params.password){
      //Encriptar contraseña
     bcrypt.hash(params.password, null, null, function(err, hash){
        user.password = hash;

        if(user.name != null && user.surname != null &&user.email != null){
           //Guardar el usuario
          user.save((err, userStored) => {
            if (err){
              res.status(500).send({message:'Error al guardar el usuario'})
              }else{
                if(!userStored){
                  res.status(404).send({message: 'No se ha registrado el usuario correctamente'});
                }else{
                  res.status(200).send({user: userStored});
                }
              }
          });
        }else{
          res.status(200).send({message: 'Rellene los siguientes campos'});
        }
      });
    }else{
      res.status(500).send({message: 'Ingrese Contraseña'});
    }
}

 function loginUSer(req, res){
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
 }


module.exports = {
  //createUser,
  loginUSer,
  saveUSer,
};
