var db = require('../db');
var config = require('config');
var dbConfig = config.get('dbConfig');

/**************************************************
Info Tabla Roles
***************************************************
  role_id serial NOT NULL,
  name character varying(100) NOT NULL,
  CONSTRAINT roles_pkey PRIMARY KEY (role_id),
  CONSTRAINT uk_roles_name UNIQUE (name)

*************************************************/

function getAllRoles(req, res) {
    db.many('select * from' + dbConfig.schema + '.roles')
      .then(function (data){
        res.status(200).send({
          data:data
        });
      })
      .catch(function ( err){
        if(err.recived == 0){
          res.status(404).send({message: 'No se ha encontrado el Rol solicitado'});
          console.log(err);
        }else{
          res.status(500).send({message:'Error en el Servidor'});
        }
      });
}


function getSingleRol(req, res){
  var userRol = req.params.role_id;
  db.one('select * from' + dbConfig.schema + '.roles where id_roles=$1', userRol)
    .then(function (data)
    {
      res.status(200)
         .send({
           data: data
         });
    })
    .catch(function (err)
    {
      if(err.recived == 0)
      {
        res.status(404).send({ message:'No se ha encontrado el Rol solicitado'});
        console.log(err);
      }else{
        res.status(500).send({ message: 'Error en el servidor'});
      }
    });

}


module.exports = {
  getAllRoles,
  getSingleRol
}
