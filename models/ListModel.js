var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ListSchema = new Schema({
	'text' : String,

module.exports = mongoose.model('List', ListSchema);