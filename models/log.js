var LogModel = new Schema({
   time: Number,
   level: String,
   ip:    String,
   line_num: String,
   body: String,
   component: String
});

var Log = mongoose.model('Log', LogModel);

module.exports = Log;
