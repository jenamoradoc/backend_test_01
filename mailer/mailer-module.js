
function SendMail(req, res, next) {

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
        user: '------',//usuario
        pass: '------'//password
    }
});

// setup e-mail data
var mailOptions = {
  from: '"gaweb" <usuario@grupoassa.com>', // quien envia
    to: 'usuario@grupoassa.com', // quien recibe
    subject: 'Prueba de Mail ', // Asunto del mail
    text: 'Esto es un mail de prueba ', // plaintext body
    html: '<b>Prueba de mail </b><br> Envie este mail con Node' // html body
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

module.exports = {
  SendMail,

}
