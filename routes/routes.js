var Question = require('../model/question');
var User = require('../model/user');
var service = require('../service/service');

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
        res.render('index', {
                                stylesheets: ['jumbotron.css'],
                            });
    });
    app.get('/quiz', function (req, res) {
        res.render('quiz', {
                                stylesheets: ['quiz.css', 'quiz-content.css'],
                                date: '2016.02.29'
                            });
    });
    app.get('/about', function (req, res) {
        res.render('about', {
                                stylesheets: ['about.css'],
                                lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                            });
    });
    app.get('/stock', function (req, res) {
        res.render('stock', {stock: '实时行情'});
    });
    app.get('/reg', function (req, res) {
        res.render('reg', {
                                scripts: ['reg.js'],
                                stylesheets: ['reg.css'],
                                success: req.flash('success').toString(),
                                error: req.flash('error').toString() 
                          });
    });
    app.post('/reg', function (req, res) {
        var password = service.parseToMd5(req.body.password);  

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
        // console.log(req.query.num);
        service.verifyUnique(User, req.query.num, function (json) {
            res.send(json);
        });
        // User.get(req.query.num, function (err, user) {
        //     if (user.length!=0) {
        //         res.send('02');//说明用户已存在
        //     } else {
        //         res.send('01');//说明用户不存在
        //     }
        // });
    })
    app.get('/login', function (req, res, next) {
        
    });
    app.post('/login', function (req, res, next) {
        var password = services.parseToMd5(req.body.password);
        
        res.send('登陆响应');
    });
    app.get('/logout', function (req, res, next) {
        
    });
    app.get('/user', function (req, res) {
        res.render('user');
    });
};
