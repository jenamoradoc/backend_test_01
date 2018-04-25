'use strict'

var nodemailer = require('nodemailer');

function SendMail(res, req){

  var trasporter = nodemailer.createTrasport({
    host: "mail.grupoassa.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 25 , // port for secure SMTP
      tls: {
         rejectUnauthorized: false
      },
      auth: {
          user: 'jenamorado',
          pass: 'lampara21'
      }
  });

  // setup e-mail data
  var mailOptions = {
    from: '"David" <jenamorado@grupoassa.com>', // sender address (who sends)
      to: 'pruebasmail345@gmail.com', // list of receivers (who receives)
      subject: 'Hello ', // Subject line
      text: 'Hello world ', // plaintext body
      html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
  };

  //definir obejto a enviar de trasport
  trasporter.senMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }

    console.log('Message sent: ' + info.response);
  });
}

module.exports = {
  SendMail,
}
