var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var GroupSchema = new Schema ({
        quizs: Array,      //问卷大标题
});

var Group = mongodb.mongoose.model("Group", GroupSchema);

module.exports = Group;


// var groupModel = {
//     quizs: []           //问卷组
// }

