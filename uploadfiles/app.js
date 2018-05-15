/*const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const http = require('http');
http.Server(app).listen(80);

// default options
app.use(fileUpload());

console.log("Server Started at port 80");

app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('uploads', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
*/
