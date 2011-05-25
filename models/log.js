var LogModel = new Schema({
   id: ObjectId,
   stacktrace: String,
   priority: String
});

var Log = mongoose.model('Log', LogModel);

module.exports = Log;
