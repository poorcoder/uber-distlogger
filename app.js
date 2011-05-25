
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

var INFO = 0
  , WARN = 1
  , ERROR = 2;

var options = {
   logLevel: WARN
};

var l = function(obj, level){
   if( level >= options['logLevel'] ){
      console.log(obj);
   };
};

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var Models = require('./models');

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});


app.post('/logs/new', function(req, res){
   res.render('index', {
      title: 'Logger'
   });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
