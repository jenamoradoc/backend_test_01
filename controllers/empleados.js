var db = require('../db');
var config = require('config');
var dbConfig = config.get('dbConfig');

/*************************************************

Info de las tabla Users
***************************************************
user_id serial NOT NULL,
 firstname character varying(100),
 lastname character varying(100),
 role_id integer NOT NULL,
 active boolean NOT NULL DEFAULT true,
 password text,
 CONSTRAINT users_pkey PRIMARY KEY (user_id),
 CONSTRAINT fk_users_roles_id FOREIGN KEY (role_id)
     REFERENCES gaweb.roles (role_id) MATCH FULL
     ON UPDATE NO ACTION ON DELETE NO ACTION

**************************************************/

//====================Get users ======================
function getAllUsers(req, res){
  db.many('select * from '+ dbConfig.schema + '.users')
    .then(function(data){
      res.status(200).send({
        data:data
      });
    })
    .catch(function(errr){
      if(err.recived == 0){
        res.status(404).send({message: 'No se han encontrado usuarios'});
        console.log(err);
      }else{
        res.status(500).send({message:'Error en el Servidor'})
      }
    });
}

function getSingleUser(req,res,next){
  var userID = req.params.user;
  db.one('select * from '+ dbConfig.schema + '.users where firstname=$2', userID)
    .then(function (data)
    {
      res.status(200)
        .send({
          data: data
        });
    })
    .catch(function (err)
    {
      if(err.received == 0)
      {
        res.status(404).send({message: 'No se ha encontrado el usuario'});
        console.log(err);
      }else{
        res.status(500).send({message:'Error en el servidor'+err});
      }
    });
}

function getSingleUserName(req,res,next){
  var usuario = '%'+req.params.user+'%';
  db.any('select * from '+ dbConfig.schema + '.users where upper(firstname) like upper($1) or upper(lastname) like upper($1)  or upper(user_id) like upper($1)', usuario)
    .then(function (data)
    {
      res.status(200)
        .send({
          data: data
        });
    })
    .catch(function (err)
    {
      if(err.received == 0)
      {
        res.status(404).send({message: 'No se ha encontrado el usuario'});
        console.log(err);
      }else{
        res.status(500).send({message:'Error en el servidor'+err});
      }
    });
}


//==================== CRUD ======================

function createUser(req, res, next){
  var user ={
    user_id:req.body.user_id,
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

function insertar(user,callback){
    db.none('insert into '+ dbConfig.schema + '.users(user_id,firstname, lastname, role_id, active, password)' +
        'values($1, $2, $3, $4, $5, $6)',
      [user.user_id,user.firstname, user.lastname, user.role_id, user.active, user.password])
      .then(function () {

        var data='Inserción exitosa';
        callback(data);
          })
      .catch(function (err)
      {
        if(err.received == 0)
        {
          var data= 'No se ha creado el usuario: '+err;
          callback(data);
        }else{
          var data='Error en el servidor: '+err;
          callback(data);
        }
      })
}


function actualizar(user,id,callback){                      //id_user,firstname, lastname, role_id, active, password
  db.none('update'+ dbConfig.schema + '.users set user_id=$1, firstname=$2, lastname=$3, rol_id=$4, active=$5, password=$6',
  [user.user_id, user.firstname, user.lastname, user.rol_id, user.active, user.password,
    id])
    .then(function(){
      var data = 'Se logro actulizar exitosamente!'
      callback(data);
    })
    .catch(function (err)
    {
      if(err.recived ==0)
      {
        var data = 'No se ha actulizado correctamente, puede intentar nuevamente.'
        callback(data);
      }else{
        var data= 'Error en el Servidor';
        callback(data);
      }
    });
}

function updateUser(req, res, next) {
  actualizar(req.body,parseInt(req.params.id),function(data){
      res.send({data: data});
  })
}

function removeUser(req, res, next) {
  var usrID = parseInt(req.params.user_id);
  db.result('delete from '+ dbConfig.schema + '.users where id_user= $1', usrID)
    .then(function (result) {
      res.status(200)
        .send({
          status: 'success',
          message: `Removed ${result.rowCount} user`
        });
    })
    .catch(function (err)
    {
      if(err.received == 0)
      {
        res.status(404).send({message: 'No se ha borrado el usuario'});
        console.log(err);
      }else{
        res.status(500).send({message:'Error en el servidor'+err});
      }
    });
}

function removeAll(req, res, next) {
  var ini=parseInt(req.params.ini);
  var fin=parseInt(req.params.fin);
  var text;
    if (ini > fin){
      ini=fin;
      fin=parseInt(req.params.ini);
    }
    for (var paso = ini; paso >= fin; paso++) {

      db.result('delete from '+ dbConfig.schema + '.usuarios where id_user= $1', paso)
        .then(function (result) {
          console.log({
              status: 'success',
              message: `Removed ${result.rowCount} user`
            });
        })
        .catch(function (err){
          if(err.received == 0)
          {
            console.log({
              message: 'No se ha borrado el usuario',
              err:err
            });
          }else{
            console.log('Error en el servidor');
          }
        });
    };
    res.send({text});
}

function existe(user, callback){
  db.one('select * from'+ dbConfig.schema+ 'users where firstname=2$ and lastname =3$,'[user.firstname, user.lastname])
    .then(function (data)
    {
      callback(parseInt(dat.id));
    })
    .catch(function (err)
    {
      callback(null)
    })
}

module.exports = {
  getAllUsers,
  getSingleUserName,
  getSingleUser,
  createUser,
  updateUser,
  removeUser,

}
