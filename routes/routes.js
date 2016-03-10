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
                                user: req.session.user,
                                stylesheets: ['jumbotron.css']
                            });
    });
    app.get('/quiz', function (req, res) {
        res.render('quiz', {
                                user: req.session.user,
                                stylesheets: ['quiz.css', 'quiz-content.css'],
                                date: '2016.02.29'
                            });
    });
    app.get('/about', function (req, res) {
        res.render('about', {
                                user: req.session.user,
                                stylesheets: ['about.css'],
                                lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                            });
    });
    app.get('/stock', function (req, res) {
        res.render('stock', {
                                user: req.session.user,
                                stock: '实时行情'});
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
            req.session.user = newUser;//用户信息存入 session
            req.flash('success', '注册成功!');
            res.redirect('/reg');//注册成功后返回主页
        });
    });
    app.get('/verifyUserUnique', function (req, res) {
        service.verifyUnique(User, req.query.num, function (json) {
            res.send(json);
        }, false);
    });
    app.get('/login', function (req, res, next) {
        
    });
    app.post('/login', function (req, res) {
        var password = service.parseToMd5(req.body.password);
        service.verifyUnique(User, req.body.num, function (json) {
            if (json.instance) {
                var pwFromDB = json.instance[0].password;
                if (pwFromDB===password) {
                    console.log('02登录成功');
                    // res.send({err: null, code: '02', instance: json.instance[0]});
                    req.session.user = json.instance[0];
                    console.log(req.session.user);
                    req.flash('登录成功！');//登录成功
                    res.redirect('/');
                } else {
                    console.log('04密码错误');
                    res.send({err: null, code: '04', instance: null});//密码错误
                }
            } else {
                console.log('01用户不存在');
                res.send({err: null, code: '01', instance: null});//用户不存在
            }
            //if json.instance.length!=0
                //获取用户密码->比较json.instance[0].password
                    //if 相同 -> res.send(登陆成功，存session/flash)
                    //else  -> res.send(密码错误)
            //else 用户不存在
                //res.send(用户不存在)
            //json.instance =null;
        },true);
        // res.send('登陆响应');
    });
    app.get('/logout', function (req, res) {
        req.session.user= null;
        console.log(req.session.user);
        res.redirect('/');
    });
    app.get('/user', function (req, res) {
        res.render('user', {
                                user: req.session.user
        });
    });
};
