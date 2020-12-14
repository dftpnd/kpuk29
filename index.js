
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
// var path = require('path');

var buttonStatisticFile = '/button_statistic.json';
var buttonClicked = {feed: 0, scare: 0};

var HTTP_PORT = 3002;
var UDP_PORT = 1337;


console.log(__dirname);
console.log(process.cwd());

/*
  o - open/opened
  c - close/closed
  st - state
  cd - cd
*/
var doors = { d1: {st: 'o', cd: 0, text: '1'} };

var vote = {};

// reduce cooldown timeout
let flag = false;





// app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(__dirname+'/public'));

io.on('connection', function(socket) {
  console.log('new browser client connection: ' + socket.id);

  socket.on('vote', function(msg) {
    // console.log('vote: ' + msg);
  });

});

http.listen(HTTP_PORT, function() {});

// UDP server
var iskraServer = require('net').createServer(function(socket) {
  console.log('createServer !!!');


  setInterval(function() {
    if(flag){
      socket.write(JSON.stringify({ servo1: 180 }));

      flag = false;
      return;
    }
    flag = true;
    
    socket.write(JSON.stringify({ servo1: 0 }));
  }, 1000);
  

  socket.on('data', function(data) {
    console.log('iskraServer !!!');


    socket.write(JSON.stringify({}));
  });

});
iskraServer.listen(UDP_PORT, '0.0.0.0');

// read and write file with vote statistics
