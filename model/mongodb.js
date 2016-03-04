var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aguiDB');
exports.mongoose = mongoose;