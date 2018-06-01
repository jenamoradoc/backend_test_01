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

  db.any('select * from ' + dbConfig.schema + ' .users where username = $1', [params.username])
  .then(response =>{
    console.log("password", response[0].password);
    
    if(bcrypt.compareSync(params.password, response[0].password)) {
    delete response[0].password;
    res.status(200).send({
      message: 'Authenticated!',
      token: jwt.createToken(response),
      user: response
    });

    } else {
      res.status(404).send({message: 'Not found Data'})
    }
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
  //loguser,
};
