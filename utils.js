merge = function(a, b){
   for( var key in b){
      a[key] = b[key];
   };
   return a;
};

populateTestData = function(Log){
   var log = new Log();
   log.time = new Date() + 931;
   log.ip = "127.1.1.4";
   log.line_num = "[dispatch.js:93]";
   log.body = "ERROR: something went wrong";
   log.dispatched = false;
   log.save( function(err) {
      console.log("Log1 added");
   });

   var log = new Log();
   log.time = new Date() + 9402;
   log.ip = "127.1.1.2";
   log.line_num = "[index.js:93]";
   log.body = "WARN: this is warning";
   log.dispatched = false;
   log.save( function(err) {
      console.log("Log2 added");
   });

   var log = new Log();
   log.time = new Date() + 09139;
   log.ip = "121.0.1.2";
   log.line_num = "[NSURL.m:12]";
   log.body = "INFO: this is information";
   log.dispatched = false;
   log.save( function(err) {
      console.log("Log3 added");
   });
   console.log(log.toString());
};
