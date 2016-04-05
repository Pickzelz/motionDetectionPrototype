var express = require('express');
var app = express();
var fs = require('fs');
var sys = require('sys')

app.set("view options", { layout: false});
app.use(express.static(__dirname + '/'))

app.get('/', function(req, res){
  res.render('/index.html')
});

app.listen('8080', function(){
  console.log('Listening App')
});
