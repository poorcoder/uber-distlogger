// Initialize the connection to the mongodb database
mongoose = require('mongoose');
Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://localhost/data/');

var Model = {};
Model.Log = require('./log.js');

module.exports = Model;
