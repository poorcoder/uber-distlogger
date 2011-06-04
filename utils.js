merge = function(a, b){
   for( var key in b){
      a[key] = b[key];
   };
   return a;
};

populateTestData = function(Log){

   Log.remove();
   console.log("Emptied database");

   var log = new Log();
   var added = true;
   log.time = new Date() + 931;
   log.ip = "127.1.1.4";
   log.line_num = "[dispatch.js:93]";
   log.body = "something went wrong";
   log.component = 'dispatch';
   log.level = "ERROR";
   log.dispatched = false;
   log.save( function(err) {
      if( err ){
         added = false;
         console.log(err);
      }
   });

   var log = new Log();
   log.time = new Date() + 9402;
   log.ip = "127.1.1.2";
   log.line_num = "[index.js:93]";
   log.body = "this is warning";
   log.level = 'ERROR';
   log.component = 'other';
   log.dispatched = false;
   log.save( function(err) {
      if( err )
         added = false;
   });

   var log = new Log();
   log.time = new Date() + 09139;
   log.ip = "121.0.1.2";
   log.line_num = "[NSURL.m:12]";
   log.body = "INFO: this is information";
   log.component = 'mobile';
   log.level = 'WARN';
   log.dispatched = false;
   log.save( function(err) {
      if( err )
         added = false;
   });

   if( added ){
      console.log('Dummy logs added.');
   } else {
      console.log('Error in adding dummy logs');
   }
   
   Log.find({}, function(err, docs){
      if( docs.length < 1)
         console.log("We didn't find anything :(");
   });

};
