//TODO: refactor & document this pos

var fs = require('fs');

var log_dir = '../logs';

var files = {};

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

var file_append = function(fd, string){
   fs.write(fd, string, 0, string.length, null);
};

var flush_queue = function(){
   while(write_queue.size() > 0){

      var task = write_queue.pop();

      var component = task['component'];
      var log_string = task['data'];

      file_append(fs_all, log_string);

      if( files[component] == undefined){
         fs.open(log_dir + '/' + component,  'a+', function(err,fd){
            files[component] = fd;
            append(files[component], log_string); 
         });
      } else {
         append(files[component], log_string); 
      }

   };

};



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


Log.prototype.toString = function(){
   var log = this['doc'];
   s = "";
   for( var label in log ){
      if( label != '_id')
         s += label + ": " + log[label] + " ";
   };
   return s;
};

Log.prototype.toFile = function(){
   try{
      write_queue.push({component: this['doc'].component, data: this.toString()});
      flush_queue();
   } catch ( e ){
      console.log("ERROR");
      console.log(e);
   }
};


module.exports = Log;
