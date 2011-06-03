var LogModel = new Schema({
   time: Number,
   level: {type: String, index: true},
   ip:    String,
   line_num: String,
   body: String,
   component: {type: String, index: true },
   dispatched: {type:Boolean, default:false}
});

var Log = mongoose.model('Log', LogModel);
Log.prototype.toString = function(){
   s = "";
   for( var v in this['doc'] ){
      if( v != '_id')
         s += v + ": " + this['doc'][v] + " ";
   };
   return s;
}
Log.remove(); //Only for testing purposes, remove for production

module.exports = Log;
