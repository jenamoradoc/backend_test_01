/*var express = require('express');
var formidable = require('formidable');

var app = express();

function uploadFile(req, res){
  app.post('/', function (req, res){
      var form = new formidable.IncomingForm();

      form.parse(req);

      form.on('fileBegin', function (name, file){
          file.path = __dirname + '/uploads/' + file.name;
      });

      form.on('file', function (name, file){
          console.log('Uploaded ' + file.name);
      });

      res.sendFile({
        __dirname,
        message:'Exito'
      });
  });
}
/*app.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/index.html');
});

module.exports = {
  uploadFile,

}*/
