var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var QuestionSchema = new Schema ({
            id: String,    //问题id
         index: String,    //问题序号
          type: String,    //问题类型
       content: String,    //问题题干
          area: String,    //问题选项
    hasDiscuss: Boolean,   //是否显示讨论框
        isMust: Boolean,   //是否为必答题
          tips: Array      //提示
});

var Question = mongodb.mongoose.model("Question", QuestionSchema);

module.exports = Question;


// var CounterSchema = Schema({
//     _id: {type: String, required: true},
//     seq: { type: Number, default: 1 }
// });

// var Counter = mongodb.mongoose.model("Counter", CounterSchema);


// QuestionSchema.pre('save', function(next) {
//     var doc = this;
//     Counter.findByIdAndUpdate({_id: 'questionid'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.id = counter.seq;
//         next();
//     });
// });
// QuestionSchema.set('toObject', { getters: true });

// QuestionSchema.methods.save = function (obj, callback) {
//     var instance = new Question(obj);
//     instance.save(function(err){
//         callback(err, null);
//     });
// }
// var QuestionDAO = function(){};
//保存试题
// QuestionDAO.prototype.save = function(obj, callback){
	// var instance = new Question(obj);
	// instance.save(function(err){
	// 	callback(err, null);
	// });
// }

//更新试题
// QuestionDAO.prototype.update = function(obj, callback){
	// Question.findByIdAndUpdate(obj._id, obj, {}, function(err){
	// 	callback(err, null);
	// });
// }

//获取试题列表
// QuestionDAO.prototype.list = function(pageNo, pageSize, callback){
	// //如果只传入回调函数，则返回所有数据
	// var arg = arguments[0];
	// if(typeof arg == 'function'){
	// 	Question.find(function(err, questions){
	// 		arg(false, questions);
	// 	});
	// }
	// //否则返回分页数据
	// else{
	// 	Question.count(function(err, count){
	// 		Question.find({}, null, {skip: (pageNo-1)*pageSize, limit: pageSize, sort: {'id': 1} }, function(err, questions){
	// 			callback(false, {questions: questions, total: count, pageNo: pageNo});
	// 		});
	// 	});
	// }
	
// }

//根据id获取试题
// QuestionDAO.prototype.get = function(id, callback){
	// Question.find({id: id}, function(err, questions){
	// 	if(questions.length){
	// 		callback(false, questions[0]);
	// 	}
	// 	else{
	// 		callback('查找不到数据！');
	// 	}
	// })
// }

//删除试题
// QuestionDAO.prototype.remove = function(id, callback){
	// Question.remove({id: id}, function(err){
	// 	callback(err, null);
	// })
// }

// module.exports = new QuestionDAO();



// var QuestionSchema = new Schema ({
//         id: String,    //问题id
//      index: String,    //问题序号
//       type: String,    //问题类型
//    content: String,    //问题题干
//       area: String,    //问题选项
// hasDiscuss: Boolean,   //是否显示讨论框
//     isMust: Boolean,   //是否为必答题
//       tips: Array      //问题提示
// });
