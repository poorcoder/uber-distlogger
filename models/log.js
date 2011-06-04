var fs = require('fs');

var log_dir = '../logs';

var fs_all;

fs.open(log_dir + "/all", 'a+', function(err, fd){
   fs_all = fd;
});


var writeQueue = {
   push: function(){

   }
};

var files = {};

var LogModel = new Schema({
   time: Date,
   level: {type: String, index: true},
   ip:    String,
   line_num: String,
   body: String,
   component: {type: String, index: true },
   dispatched: {type:Boolean, default:false}
});

var Log = mongoose.model('Log', LogModel);

var file_append = function(fd, string){
   fs.write(fd, string, 0, string.length, null);
};

Log.prototype.toString = function(){
   var log = this['doc'];
   s = "";
   for( var label in log ){
      if( label != '_id')
         s += label + ": " + log[label] + " ";
   };
   return s;
}

Log.prototype.fs_write(){
   var log = this['doc'];
   var log_string = this.toString();

   file_append(fs_write, log_string);

   if( files[log.component] == undefined){
      fs.open(log_dir + '/' + log.component,  'a+', function(err,fd){
         files[log.component] = fd;
         append(files[log.component], log_string); 
      });
   } else {
      append(files[log.component], log_string); 
   }

};

module.exports = Log;
