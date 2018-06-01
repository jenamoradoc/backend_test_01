var db = require('../db');
var config = require('config');
var generator = require('generate-password');
var dbConfig = config.get('dbConfig');
const bcrypt = require('bcrypt');

/*************************************************

Info de las tabla Users
***************************************************
 id serial NOT NULL,
 username character varying(50) NOT NULL,
 password character varying(50) NOT NULL,
 firstname character varying(50) NOT NULL,
 lastname character varying(50) NOT NULL,
 email character varying(50),
 active boolean NOT NULL,
 role_id integer,
 CONSTRAINT users_pk PRIMARY KEY (id),
 CONSTRAINT users_roles_fk FOREIGN KEY (role_id)
     REFERENCES gaweb.roles (role_id) MATCH SIMPLE
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
  var userID = params.username;
  db.one('select * from '+ dbConfig.schema + '.users where username=$1',  [params.username])
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

  db.one('select * from '+ dbConfig.schema + '.users where username = $1 or email = $2', [req.body.username, req.body.email]).
  then(function(response){
    console.log(JSON.stringify(response));
    res.status(200).send({message: 'El usuario ya existe'})
  }).catch(function(error){
    var password = generator.generate({
    length: 20,
    numbers: true
  });
  console.log(password);
  let hash = bcrypt.hashSync(password, 10);
  var user ={
    id:req.body.id,
    username:req.body.username,
    password:hash,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    active: req.body.active,
    role_id:req.body.role_id
  };
  insertar(user, function(data){
    sendMail(user.email, password)
    res.send({data: data});
  });
});
}

function insertar(user,callback){
  console.log(user);
    db.none('insert into '+ dbConfig.schema + '.users(username, password, firstname, lastname, email, active, role_id)' +
        'values($1, $2, $3, $4, $5, $6, $7)',
      [ user.username ,user.password, user.firstname, user.lastname, user.email, user.active, user.role_id])

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

function sendMail(email, password) {  
  
  var nodemailer = require('nodemailer');
  
  // Create the transporter with the required configuration for Outlook
  var transporter = nodemailer.createTransport({
      host: "mail.grupoassa.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 25, // port for secure SMTP
      tls: {
         rejectUnauthorized: false
      },
      auth: {
          user: '',//usuario
          pass: ''//password
      }
  });
  
  // setup e-mail data
  var mailOptions = {
      from: '"gaweb" <@mail.com>', // quien envia
      to: email, // quien recibe
      subject: 'Prueba de Mail ', // Asunto del mail
      text: 'tu contraseñes es: ' + password, // plaintext body
      html: '<b>Prueba de mail </b><br> tu contraseñes es: ' + password // html body
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }else{
        res.status(200).send({message:'Mensaje enviado'})
      }
  
      console.log('Message sent: ' + info.response);
  });
  
  }


function actualizar(user,id,callback){                      //username, password, firstname, lastname, email, active, role_id
  db.none('update'+ dbConfig.schema + '.users set username=$1, password=$2, firstname=$3, lastname=$4, email=$5, active=$6, role_id=7',
  [user.username, user.password, user.firstname, user.lastname, user.email, user.active, user.role_id,
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

function changePassword(req, res, next) {
  console.log("ENTRE A CAMBIAR PASS");
  
  var params = req.body;

  console.log("PARAMS: " + JSON.stringify(params));
  
  db.one('select * from ' + dbConfig.schema + ' .users where username = $1', [params.username])
    .then(response =>{
      console.log("response: " + JSON.stringify(response));

      if(bcrypt.compareSync(params.passwordVieja, response.password)) {
        let hash = bcrypt.hashSync(params.passwordNueva, 10);
        db.none('update ' + dbConfig.schema + ' .users set password = $1 where id = $2', [hash, response.id])
          .then(result => {
            res.status(200)
              .send({
                status: 'success',
                message: `Su contraseña se ha actualizado correctamente`
              });
          }, error=>{
            console.log("ERROR: " + JSON.stringify(error));
            
          }).catch(err=>{
            console.log("ERROR: " + JSON.stringify(err));
          })

      
      }else{
        res.status(404)
          .send({
            status: 'error',
            message: `La contraseña ingresada no es correcta. Por favor, intente nuevamente.`
          });
      }
    })
}

function resetPassword(req, res, next) {
  console.log("ENTRE A RESET PASS");
  
  var params = req.body;

  console.log("PARAMS: " + JSON.stringify(params));
  
  db.one('select * from ' + dbConfig.schema + ' .users where username = $1', [params.username])
    .then(response =>{
      console.log("response: " + JSON.stringify(response));

      var password = generator.generate({
        length: 20,
        numbers: true
      });
      let hash = bcrypt.hashSync(password, 10);
        db.none('update ' + dbConfig.schema + ' .users set password = $1 where id = $2', [hash, response.id])
          .then(result => {
            sendMail(response.email, password)
            console.log("Envio mail: " + response.email)
            res.status(200)
              .send({
                status: 'success',
                message: `Su contraseña se ha generado correctamente`
              });
          }, error=>{
            console.log("ERROR: " + JSON.stringify(error));
            
          }).catch(err=>{
            console.log("ERROR: " + JSON.stringify(err));
          })
    })
}

function updateUser(req, res, next) {
  actualizar(req.body,parseInt(req.params.id),function(data){
      res.send({data: data});
  })
}


function removeUser(req, res, next) {
  var empID = parseInt(req.params.id);
  db.result('delete from '+ dbConfig.schema + '.users where id = $1', empID)
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

      db.result('delete from '+ dbConfig.schema + '.usuarios where username= $1', paso)
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
  db.one('select * from'+ dbConfig.schema+ 'users where username=1$ and email =2$,'[user.username, user.email])
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
  getSingleUser,
  createUser,
  updateUser,
  removeUser,
  changePassword,
  resetPassword,
}
