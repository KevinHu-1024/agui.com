var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var UserSchema = new Schema ({
          id: String,   //用户id
        name: String,   //用户名
       email: String,   //用户邮箱
    password: String,   //用户密码
         num: String,   //阿贵特权号
       photo: String,   //用户头像
  activities: Array,    //参加过的活动
       group: String,   //用户组
   isInvalid: Boolean   //登陆天数是否有效
});

var User = mongodb.mongoose.model("User", UserSchema);

module.exports = User;


// var userModel = {
//     id: '',             //用户id
//     name: '',           //用户名
//     email: '',           //用户邮箱
//     password: '',       //用户密码
//     num: '',            //阿贵特权号
//     photo: '',          //用户头像
//     activities: [],     //参加过的活动
//     group: '',          //用户组
//     isInvalid: false,   //登陆天数是否有效
// }

// 在 models 文件夹下新建 post.js ，添加如下代码：

//     var mongodb = require('./db');

//     function Post(name, title, post) {
//       this.name = name;
//       this.title = title;
//       this.post = post;
//     }

//     module.exports = Post;

