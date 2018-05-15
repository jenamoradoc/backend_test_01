'use strict'

var jwt = require('../services/jwt');
var db = require('../db');
var config = require('config');
var dbConfig = config.get('dbConfig');
const bcrypt = require('bcrypt');

//================ Log of users ======================

function loginUser(req, res){
  console.log('llego al metodo');

  var params = req.body;

  var email = params.email;

  db.any('select * from ' + dbConfig.schema + ' .users where email = ?', [params.email])
  .then(response =>{
    console.log('paso por aqui');
    res.status(200).send({
      message: 'Authenticated!',
      token: jwt.createToken(response),
      user: response
    });
  }).catch((error) =>{
      if(error.recived==0){
      res.status(404).send({message: 'Not found Data'})
      return;
    }
  });
}


module.exports = {
  //createUser,
  loginUser,
  //saveUSer,
//  loguser,
};
