var db = require('../db');
var config = require('config');
var dbConfig = config.ger('dbConfig');

/*************************************************

Info de las tablas
***************************************************


**************************************************/

//====================Get users ======================
function getAllUsers(req, res){
  db.many('select * from '+ dbConfig.schema + '.empleados')
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

function getSingleUser(req,res, next){
  var empID = req.params.id;
  db.one('select * from'+ dbConfig.schema + '.emplados wher id =$1', empID)
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
        res.status(404).send({message:'No se ha encontrado el usuario solicitado'});
        console.log(err);
      }else{
        res.status(500).send({message:'Error en el servidor'+err});
      }
    });
}

//==================== CRUD ======================

function createUser(req, res, next){
  var user ={
    nombre:req.body.nombre,
    apellido:req.body.apellido,
    usuario:req.body.usuario,
    rol_id:req.body.rol_id
  };
  insertar(user, function(data){
    res.send({data: data});
  });

}

function insertar(user,callback){
    db.none('insert into '+ dbConfig.schema + '.empleados(nombre, apellido, usuario, rol_id) ' +
        'values($1, $2, $3, $4)',
      [user.nombre, user.apellido, user.usuario, user.rol_id])
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

function actualizar(user,id,callback){
  db.none('update'+ dbConfig.schema + '.empleados set nombre=$1, apellido=$2, usuario=$3, rol_id=$4 where id=$5',
  [user.nombre, user.apellido, user.usuario, user.rol_id,
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

function removeUser(req, res, next){
  var empID = parseInt(req.params.id);
  db.result('delete from'+ dbConfig.schema + '.empleados where id=$1');
    .then(function (result){
      res.status(200)
      .send({
        status:'sucess',
        message: `Removed ${result.rowCount} user`
      });
    })
    .catch(function (err)
    {
      if(err.recived ==0)
      {
        res.status(404).send({message:'No se ha borrado correctamente el Usuario'});
        console.log(err);
      }else{
        res.status(500).send({message:'Error en el Servidor'});
      }
    });
}

function removeAll(req, res, next){
  var ini=parseInt(req.params.ini);
  var fin=parseInt(req.params.fin);
  var text;
    if (ini > fin){
      ini=fin;
      fin=parseInt(req.params.ini)
    }
    for (var paso = ini; paso >= fin; paso++) {

      db.result('delete from '+ dbConfig.schema + 'where empleados = $1', paso)
        .then(function (result){
          console.log({
            status:'succes',
            message: `Removed ${result.rowCount} user`
          });
        })
        .catch(function(err){
          console.log({
            message:'No se han borrado los usuarios'
            err:err
          });
        }else{
          console.log('Error en el servidor');
        }
      });
    };
    res.send({text});
}
k
