
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

var INFO = 0
  , WARN = 1
  , ERROR = 2;

var options = {
   logLevel: INFO
};

var l = function(obj, level){
   if( level >= options['logLevel'] ){
      console.log(obj);
   };
};

require('./utils.js');

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
var Log = Models.Log;

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/logs', function(req,res){
   var logs = Log.find({}, function(err, results){
      res.render('logs/index',{
         title: 'Recent Logs',
         logs: results
      });
   });
});

app.post('/logs/new', function(req, res){
   var log = new Log();
   merge(log, req.body);
   log.save(function(err){
      if(err){
        console.log("ERROR: " + err); 
      } else{ 
         res.render('index', {
            title: 'Logger'
         });
      }
   });
});

var rules = require('./rules');
rules.seed();
populateTestData(Log);

var dispatchMail = function(Log){
   console.log("Processing dispatch queue");
   for( var engineerIndex in rules.engineers){
      var engineer = rules.engineers[engineerIndex];
      Log.find(engineer.filter, function(err, docs){
         // console.log(docs);
         if(docs == null){       // maybe undefined and [] could work here, need to lookup def
         // l("No needed dispatching for engineer: " + INFO);
         } else {
         // l("Needed to dispach: " + docs, INFO);
         };
      });
   }
};

var t = setInterval(dispatchMail, 3000, Log);

// Only listen on $ node app.js
if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
