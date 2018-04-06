'use strict'
//service of jwt

var jwt    = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = function(user){
    var payload = {
      sub: user._id,
      name : user.name,
      iat: moment().unix(),
      exp: moment().add(12, "days").unix()
    };
    return jwt.encode(payload, secret);
};
