var LogModel = new Schema({
   id: ObjectId,
   level: String,
   ip: String,
   component: String,
   stacktrace: String
});

var Log = mongoose.model('Log', LogModel);

module.exports = Log;
