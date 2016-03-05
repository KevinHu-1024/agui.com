var Question = require('../model/question');
var User = require('../model/user');
var crypto = require('crypto')
// var services = require('../public/javascripts/services');

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
    app.get('/quiz', function (req, res) {
        res.render('quiz', {date: '2016.02.29'});
    });
    app.get('/about', function (req, res) {
        res.render('about', {lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'});
    });
    app.get('/stock', function (req, res) {
        res.render('stock', {stock: '实时行情'});
    });
    app.get('/reg', function (req, res) {
        res.render('reg', {
            success: req.flash('success').toString(),
            error: req.flash('error').toString() 
        });
    });
    app.post('/reg', function (req, res) {
        
        var password = req.body.password,
        password_re = req.body['password_re'];
        //检验用户两次输入的密码是否一致
        if (password_re != password) {
            // req.flash('error', '两次输入的密码不一致!'); 
            return res.redirect('/reg');//返回注册页
        }

        var md5 = crypto.createHash('md5');
        password = md5.update(req.body.password).digest('hex');
        
        
        var newUser = new User({
            email: req.body.email,
            password: password,
            num: req.body.num,
            name: req.body.name
        });
        
        User.get(newUser.num, function (err, user) {
            console.log(err, user);
            if (user.length!=0) {
                req.flash('error', '用户已存在!');
                return res.redirect('/reg');//返回注册页
            }
            //如果不存在则新增用户
            newUser.save(function (err, user) {
                if (err) {
                req.flash('error', err);
                return res.redirect('/reg');//注册失败返回主册页
                }
                req.session.user = user;//用户信息存入 session
                req.flash('success', '注册成功!');
                res.redirect('/reg');//注册成功后返回主页
            });
        });
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
