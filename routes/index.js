var express = require('express');
var router = express.Router();

//Get Home//
router.get('/', function(req, res, next){
  res.render('index', title: 'El servidor web esta ejecutandose....')
});
