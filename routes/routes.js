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
            scripts: ['reg.js'],
            success: req.flash('success').toString(),
            error: req.flash('error').toString() 
        });
    });
    app.post('/reg', function (req, res) {
        var md5 = crypto.createHash('md5');
        password = md5.update(req.body.password).digest('hex');  
    //这部分以后整合进前端ajax处理  
        var newUser = new User({
            email: req.body.email,
            password: password,
            num: req.body.num,
            name: req.body.name,
            id: '',
            photo: '',
            activities: [],
            group:'',
            isInvalid: false
        });
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
    app.get('/verifyUserUnique', function (req, res) {
        User.get(req.query.num, function (err, user) {
            if (user.length!=0) {
                res.send('02');
            } else {
                res.send('01');
            }
        });
    })
    app.get('/login', function (req, res, next) {

    });
    app.post('/login', function (req, res, next) {

    });
    app.get('/logout', function (req, res, next) {
        
    });
    app.get('/user', function (req, res) {
        res.render('user');
    });
};
