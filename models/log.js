var LogModel = new Schema({
   time: Number,
   level: {type: String, index: true},
   ip:    String,
   line_num: String,
   body: String,
   component: {type: String, index: true },
   dispatched: Boolean
});

var Log = mongoose.model('Log', LogModel);
Log.remove(); //Only for testing purposes, remove for production

module.exports = Log;
