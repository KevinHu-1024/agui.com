var Question = require('../model/question');

var callback = function(req, res, err, data){
	if(err){
		res.send({success: false, error: err});
	}
	else{
		res.send({success: true, data: data});
	}
}

module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index');
    });
    app.get('/quiz', function (req, res, next) {
        res.render('quiz', {date: '2016.02.29'});
    });
    app.get('/about', function (req, res, next) {
        res.render('about', {lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'});
    });
    app.get('/stock', function (req, res, next) {
        res.render('stock', {stock: '实时行情'});
    });
    app.get('/reg', function (req, res, next) {
        res.render('reg');
    });
    app.post('/reg', function (req, res, next) {

    });
    app.get('/login', function (req, res, next) {

    });
    app.post('/login', function (req, res, next) {

    });
    app.get('/logout', function (req, res, next) {
        
    });
    app.get('/user', function (req, res) {
        var data = new Question({
        id: 'String',    //问题id
     index: 'String',    //问题序号
      type: 'String',    //问题类型
   content: 'String',    //问题题干
      area: 'String',    //问题选项
hasDiscuss: true,   //是否显示讨论框
    isMust: false,   //是否为必答题
      tips:['aaa','bbb']
        });
		data.save(function(err, data){
			callback(req, res, err, data);
		});
        // res.render('user');
    });
};
