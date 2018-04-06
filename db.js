'use strict'

const initOptions = {
  // global event notification
  error: (error, e) => {
      if (e.cn) {
        // A connection-related error;
        //connections are reported back with the password hashed
        //for sale errors logging, without expossing passwords
        console.log('CN:' e.cn);
        console.log('EVENT:', error.message || error);
      }
  }
};

const pgp = require('pg-promise')(initOptions);
var config = require('config');

var dbConfig = config.get('dbConfig'); // from default json
const db = pgp(dbConfig);

db.connect()
    .then(obj => {
        obj.done(); // success, release the connection
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

module.exports = db;
