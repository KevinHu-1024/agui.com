var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var QuizSchema = new Schema ({
        title: String,          //问卷大标题
        discription: String,    //问卷描述
        authority: Array,      //问卷权限
        questions:Array        //问题组
});

var Quiz = mongodb.mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;


// var paperModel = {
//     title: '',          //问卷大标题
//     discription: '',    //问卷描述
//     authority: [],      //问卷权限
//     questions:[]        //问题组
// }