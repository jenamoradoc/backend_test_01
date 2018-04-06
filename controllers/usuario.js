'use strict'

var jwt = require('../services/jwt');
var db = require('../db');
var config = require('config');
var dbConfig = config.get('dbConfig');

//================ Log of users ======================

function logdb(){
  return new Promise((resolve, reject) =>{
    db.one('select * from '+ dbConfig.schema + 'La busqueda a realizarse de la db, / usuario = $1', users)
    .then(function(data){
        resolve(data);
    })
    .catch(function(err){
        reject(err);
    });
  });
}

//================== authentication ==============

function logingUser(req, res){

  var params = req.body;

  var username = params.user;
  var password = params.pass;

  logdb(params.user)
    .then(function(data){
      res.status(200).send({
        message:'Authenticated'
        token: jwt.createToken(data),
        user: data
      });
    }).catch((error) =>{
      if(error.recived==0){
        res.status(404).send({message: 'Not found data'})
      }else{
        res.status(404).send({message:'Error del Sistema: '+err})}
    });
  }else{
    res.status(400).send({message:'Authentication Failed!'});
  }

module.exports = {
  logingUser,
};
