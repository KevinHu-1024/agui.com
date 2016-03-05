var crypto = require('crypto'),
    User = require('../../model/user.js');
    
module.exports = {
    validateUserReg: function (req, res) {
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
        
        
        return newUser;
    }
}
        
        // //检查用户名是否已经存在 
        // User.get(newUser.name, function (err, user) {
        //     if (err) {
        //     req.flash('error', err);
        //     return res.redirect('/');
        //     }
        //     if (user) {
        //     req.flash('error', '用户已存在!');
        //     return res.redirect('/reg');//返回注册页
        //     }
        //     //如果不存在则新增用户
        //     newUser.save(function (err, user) {
        //     if (err) {
        //         req.flash('error', err);
        //         return res.redirect('/reg');//注册失败返回主册页
        //     }
        //     req.session.user = newUser;//用户信息存入 session
        //     req.flash('success', '注册成功!');
        //     res.redirect('/');//注册成功后返回主页
        //     });
        // });