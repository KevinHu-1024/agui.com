var mongoose = require('mongoose');
var settings = require('../settings')
mongoose.connect("mongodb://" + settings.host + "/" + settings.db);
exports.mongoose = mongoose;