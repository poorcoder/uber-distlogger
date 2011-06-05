var fs = require('fs');

var log_dir = '../logs';

var fs_all;

fs.open(log_dir + "/all", 'a+', function(err, fd){
   fs_all = fd;
});


var write_queue = {
   data: [],
   push: function(obj){
      this.data.push(obj);
   },
   pop: function(){
      if(this.data.length > 0){
         var obj = this.data[0];
         this.data = this.data.splice(1, this.data.length);
         return obj;
      }
   },
   size: function(){
      return this.data.length;
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

var flush_queue = function(){
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

write_queue.push('Hello');
write_queue.push('World');
write_queue.push('YEEEE');
write_queue.pop();
console.log(write_queue.size());
console.log(write_queue.data[0]);
console.log(write_queue.data[1]);

module.exports = Log;
