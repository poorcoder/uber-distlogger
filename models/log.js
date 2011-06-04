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
}

module.exports = Log;
