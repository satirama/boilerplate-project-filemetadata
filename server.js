'use strict';

var express = require('express');
var cors = require('cors');
var url = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@ds139985.mlab.com:39985/fcc-filemetadata";

// require and use "multer"...
var multer = require('multer');
var upload = multer();
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

app.post("/api/fileanalyse",upload.single('upfile'),function(req, res){
  res.json({
    fileName: req.file.originalname,
    fileSize: req.file.size/1000 + 'KB'
  });
});
