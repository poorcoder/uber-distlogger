var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
var LogModel = new Schema({
   id: ObjectId,
   stacktrace: String,
   priority: String
});
var Log = mongoose.model('Log', LogModel);
mongoose.connect('mongodb://localhost/data/');

module.exports = Log;
