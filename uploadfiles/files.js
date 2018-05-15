var db = require('../db');
var config = require('config');
var dbConfig = config.get('dbConfig');


/*********************************************************
**********************************************************
TABLE gaweb.archivos

  image_id serial NOT NULL,
  name character varying(100),
  link text,
  description text,
  section_name character varying(100)
  ---------------------
  ALTER TABLE gaweb.archivos
    OWNER TO postgres;
**********************************************************
*********************************************************/

function createfile(req, res, next){
  console.log(' aqui');
  var ufile ={
    image_id:req.body.image_id,
    name:req.body.name,
    link:req.body.link,
    description:req.body.description,
    section_name:req.body.section_name
  };
  insertar(ufile, function(data){
    console.log('llego aqui');
    res.send({data: data});
  });

}

function insertar(ufile,callback){
    db.none('insert into '+ dbConfig.schema + '.archivos(image_id,name, link, description, section_name)' +
        'values($1, $2, $3, $4, $5)',
      [ufile.image_id,ufile.name, ufile.link, ufile.description, ufile.section_name])
      .then(function () {

        var data='Inserción exitosa';
        callback(data);
          })
      .catch(function (err)
      {
        if(err.received == 0)
        {
          var data= 'No se ha subido correctamente el archivo: '+err;
          callback(data);
        }else{
          var data='Error en el servidor: '+err;
          callback(data);
        }
      });
}

//==================================================
const formidable = require('formidable')
const path = require('path')
const uploadDir = path.join(__dirname,'/uploads/') //i made this  before the function because i use it multiple times for deleting later

function uploadMedia (req, res, next) { // This is just for my Controller same as app.post(url, function(req,res,next) {....
  var form = new formidable.IncomingForm()
  form.multiples = true
  form.keepExtensions = true
  form.uploadDir = uploadDir
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: err })
    res.status(200).json({ uploaded: true })
  })
  form.on('fileBegin', function (name, file) {
    const [fileName, fileExt] = file.name.split('.')
    file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
  })
}


//===================================================

module.exports = {
  createfile,
  uploadMedia,
}
