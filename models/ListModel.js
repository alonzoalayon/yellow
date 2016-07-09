var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ListSchema = new Schema({
	'text' : String,	'items' : Array});

module.exports = mongoose.model('List', ListSchema);
