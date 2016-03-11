# 阿贵指数调查网站设计

***
## 感谢

[参考项目1](http://blog.csdn.net/daowzq/article/details/34827955)

这个项目值得借鉴的是它的`SurveyRazor.js`问卷渲染引擎，里面似乎实现了包括问卷类在内的所有功能，引入网页中时只需要下面的代码：

```javascript
//需要事先引入数据文件
//<script src="JsonData.js" type="text/javascript"></script>
SurveyRazor.dataStore.load(data);
SurveyRazor.surveyRazor.options({
    description: desc, //描述
    haveBgImg: false,  //启用背景图片
    surveyTitle: "客戶滿意度調查表"
}).create().show();
```
可是作者并没有给出json源数据及任何参考文档，我们需要手工分析这个引擎的结构，及使用方法

**最后这个项目中参考了它对问卷分类及对问题中必要属性的设置**

[参考项目2](https://github.com/LiangCY/questionnaire)

这个项目值得借鉴的是它的后台系统设计，完成了问卷问题的增删改及数据统计工作。

缺点是它的问题类型只有有限的几种，没有前者那么丰富;作者采用了react和VUE来开发的，虽然也能大概看清业务逻辑，但时间成本略高

[参考项目3](http://www.cocoachina.com/cms/wap.php?action=article&id=13440)
[它的Github](https://github.com/Double-Lv/QuestionMaker)
[教程](http://www.cnblogs.com/lvdabao/p/mean-techstack-angular.html)

这个项目值得参考的是它的后台系统设计，完成了问卷问题的增删改及预览工作。

缺点是它和我们的业务并不完全一样，主要展示了angularJS的双向绑定和构建单页应用

而且没有后台统计和权限管理功能，全部由angularJS来处理，连jade模板都不用了，都是ng模板直接拼接

然而难能可贵的是作者的博文中有学习angularJS的[笔记](http://www.cnblogs.com/lvdabao/tag/AngularJs/)，可以共学习angularJS时参考

**最后主要借鉴了这个项目中对问题和问卷类行为的设计**

[参考项目4](http://www.cnblogs.com/lvdabao/p/mean-techstack-angular.html)
[更多](http://angularjs4u.com/demos/5-angularjs-quiz-demos/)

这个是国外小哥写的4个问卷项目，还没细看

[参考项目5-n-blog]()

主要借鉴了这个项目中使用mongodb原生驱动的操作，用户类行为设计，session/flash的操作

**最后主要借鉴了它对session/flash的操作**

[参考资料6](https://docs.mongodb.org/master/MongoDB-crud-guide-master.pdf)

MONGODB 增删改查官方手册

MONGOOSE [官方api手册](http://mongoosejs.com/docs/index.html)

实现id自增的官方[方法](https://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/)

**最后主要选择了mongoose来操作数据库，同时对项目三的代码进行了重构**

有些方法调用语法没变，方法内部没做什么特殊操作，mongoose也提供了原生方法，实在没有必要再封装一次。项目三的作者从java出身，封装的习惯确实蛮好，但这里我认为实在没有必要封装，藉由js模块已经可以处理的很好了，没有必要对行为类再次抽象

>Each document can be saved to the database by calling its save method

## 前端原型设计

2016.02.19

* 草稿静态页面，包括一个左侧边栏和右侧的容器
* 右侧主页面，单页应用，本部分无刷新切换，初试原生AJAX，见博文：初尝AJAX

2016.02.20

* 创建一个基础服务器，模板引擎JADE
* 放置好相关静态文件，AJAX没有做封装，效果是点击三个图标后，右侧页面实现无刷新更新成一个p段落->完成
* 现在

右侧还只能更新一个静态的（即预先渲染好jade模板为文本或html等文件，然后替换目标位置的innerHTML），理想效果是右侧部分更新的页面也从模板引擎渲染而来，这个模板中不包括左边的边栏，渲染结果（HTML）替换右侧容器中的innerHTML
* res.render

它渲染发生在第一次进入到该页面时，并不是时刻跟着后台在渲染。表现为当服务器运行时，我修改了render的title，刷新页面，发现页面并没有更改，重启服务器之后，才被修改

* 这里就涉及到了前段渲染还是后端渲染的问题

如果采用前端渲染需要使用AngularJS或js前端模板引擎来完成渲染工作，后台只需要给前台数据即可，这样可以做到前后端分离，JADE还能用吗？经查能用，不过方案很纠结，一般直接交由前端渲染。后端渲染的话没弄明白如何在后台用JADE渲染同时让这些被渲染过的数据在前端做到无刷新更新（啊！因为是无刷新更新，整体更新前端那个模板即可，不用只纠结右侧了），后端直接渲染即可，因为左边栏没变，故没有影响。正好还写过后端渲染的测试网站，写起来比较顺手，但怎么单独调用渲染和返回AJAX数据，还需要研究，参见Express官网api中res.render(view [, locals] [, callback])部分，貌似有线索

* 选型方案：

经过一天的纠结，为了开发进度和个人对于代码分离的审美，同时为了移动端使用另一套实现方式Ionic来做app，同时还要适配不同设备，这样就有两套UI共同使用一套数据驱动。所以最后决定采用前端AngularJS，后端搭建提供rest风格api的Express数据服务器

* 在排Fedora下MD编辑器的坑时，在github上发现一个很漂亮的CSS框架Pure

* JADE在客户端也能用，但需要处理兼容性问题，因为他是用ES5写的

2016.02.21

* 今天开始学习AngularJS

借助的资料是ng-book(第一版)，看英文原版文档，实在看不懂的自己上翻译，再看不懂就去看中文版，看着看着发现，中文版翻译的真是呵呵...

2016.02.22

* 今天又纠结技术选型的问题

本来看ng-book原版文档学了一天了，突然注意到它的IE兼容性问题，貌似还比较难解决。就先把它放一放，准备换方案。又查到了几种，比如JADE在客户端使用，服务端预渲染，还有其他各种前端渲染引擎，又是纠结许久。后来出门待了一会冷静了一下，还是决定不换方案了，连静态页面都没写出来，后台还不怎么会，就开始想换来换去实在不妥，还是先用好一种工具把网站实现为好，大不了到时候叫掌柜一声令下，让客官们换浏览器不就得了嘛，多大点事儿，还是老老实实把产品做出来比啥都强，所以耽误了一个多小时，继续开始学习AngularJS

* 收获

在一个多小时的纠结中，又读到了好多关于前后端分离、架构、常用前端模板引擎及性能、jade的深入（比如服务端预渲染）等文章，算是一个小小的收获

今天去拉勾网逛的时候，还给顺带发现了一个bug，并给他们做了提交并被接受：关于170号段的正则匹配问题，最新的活动页面手机号的正则式和他们官网通用的正则时不统一（被简化了），结果导致了我的170号段无法参加活动，js也不加密不混淆，也没有用到统一的工具库（可能是因为只是活动页面的关系吧），还发现了他们的UI组件库

2016.02.26

* 服务器

这几天忙着跟了一下课程，顺带把自己托管于服务器重新部署了一下，把原有的nginx+php切换成了nginx+nodejs，原有的网站下线。初步学习了nginx服务器配置多网站的方法

2016.02.27

* 服务器

今天对服务器配置了守护进程pm2，但是遇到了app无法启动的问题，表现为pm2显示app运行，但是访问地址时显示502，而自己手工启动app.js时却可以访问。查阅多方资料未果，最后发现[这里](https://cnodejs.org/topic/53cffbcf691a430912542598)有解决方案，问题出在express4中，服务器被分离到了bin/www中，应该直接启动www，而不是app.js。需要深入理解express的原理。或者可以配置一个[json](http://stackoverflow.com/questions/27882759/express-4-pm2-watch-not-working)以便以后直接用`pm2 app`启动（没有.js，这个app是nickname）

* 原生局部

点击图标-由ajax向服务器发送命令-服务器收到之后渲染局部的那一小块的jade-返回-收到之后直接拼入容器，完成

* 看express源码（用到哪里看到哪里）

按照上面的想法，想要实现需要渲染的那部分由服务器渲染并返回。需要确定`res.render()`是如何运行、参量如何处理、以及如何返回客户端的。所以去查看了`express/lib/response.js`82行和777行对`res.render()`和它用到的`res.send()`的处理。得知，`res.render()`接收三个参数，分别是模板（视图）-选项（要传给模板引擎的）-回调函数，render渲染完模板之后如果没有设置回调函数，就会将渲染后的结果他们交给send方法进行发送，send方法检测到他们是string类型之后，会将他们以html的格式向客户端发送。这样我们在客户端接收到的实际上就是一个html格式的文档，符合我们最开始定下的预期。

另外一个需要确定的是从哪里去调用`res.render`，我们采用了从路由器调用/main路径的方式做的。应该还有其他请求的方式，比如说发送一段脚本让服务器执行后直接返回html。以后在做探索。

还有`res.render()`的第二个参数的类型，是一个对象包括很多键值对，还是一个键值对，值里是一个json？看到res.send方法中包含了对jsonp的支持代码，这个需要探索一下，这个第二参数怎么传，经过测试，第二参数随便怎么传都可以，但要保证第二个参数只是一个对象，`res.render`中还对第二参数进行了self.local处理？这是什么待探索。对这个文件修改完了之后要对服务器进行重启，否则会找不到数据，对视图的改动可以不用重启

另在app.js中对路由器的模块化导出，怎么做，应该把路由器放到一个单独的文件中进行维护，而不是和主程序混杂在一起。还有路由相关的几个变量注意一下，刚才在哪里坑了好久

`res.send`方法中，如果传入的数据是数字->状态码；字符串->html；布朗值->不处理；对象->空（去掉null，返回空字符串）/缓存（不知道怎么处理）/这几种都不是（json）

还是去看api吧[API](http://expressjs.com/zh-cn/4x/api.html#res.render)

准备向ES6/typescript进行切换

函数式编程->coffeescript

面向对象编程->typescript

- [ ] 关于exports和modules等用法，需要去参考CMD/AMD/commonJS的知识

2016.02.28

开始向bootstrap迁移，为了提高效率，不想写css

-  [ ] 发现了一个特别好的cavans图表[echarts](http://echarts.baidu.com/index.html)

- [ ] 发现一个滑动触摸库swiper[swiper](www.swiper.com.cn/)

需要查询服务器端缓存技术

服务器端jade压缩问题 app.locals.pretty = true;

将项目迁移到了express4框架

Fedora下的DNF包管理中的源都太古老了，express竟然是v3的

- [ ] 首页大图中覆盖一个K线或折线的cavans

路由的分离与规划

2016.02.29

完成了路由分离

完成了基本页面的分割

- [ ] 有时间看一下html2jade的源码，提交一下有关中文转换的错误

读别人的问卷引擎代码

本周已经进入开发中倒数第三难的部分了：问卷类的开发

当然后面还有更难的：数据整理分析系统；

和最难的：权限控制及后台管理系统

还有收尾：页面美化

- [ ] 查找压力测试相关内容

2016.03.01

问卷部分有进度绑定和数据绑定，可不可以拿ng或vue来做？

用jade重构问卷生成程序，后端生成json格式的问卷数据，jade按顺序渲染

完成问卷的jade渲染模板

- [ ] 查询awesome-nodejs

2016.03.02

后台系统用ng生成

问卷提交采用原生方案，问卷生成和用户管理使用ng方案；PC端页面采用原始的原生ajax生成，前后端耦合，而移动端使用ng+Ionic生成，前后端分离。虽然这样系统比较松散，但是能练习到更多的技术，以后都向ng靠拢

设计问卷模型、用户模型、问题模型，准备放入数据库

2016.03.03

数据模型测试，被挫的够呛，晚上狂补mogoose的api和原生mongodb的CURD文档

2016.03.04

去望京美团门外逛了一圈，充点信仰值，给自己打气

数据模型测试成功，并对参考项目的代码进行了重构

2016.03.05

坑爹的DNF，在运行服务器时connect-mongo[报错](https://github.com/hapijs/joi/issues/758)，查询之后发现是nodejs版本太低，不应该啊。于是查了一下dnf上nodejs的最新版本，才0.10.36版！！上一次express就是因为版本太老，这次又是...DNF想打败yum还有很长的路要走啊！

于是开始下载nodejs手动更新，还遇到了如何在fedora下设置环境变量的问题，查询[解决](http://blog.csdn.net/jianqi2010/article/details/6256006)，这里第一个方案只是临时的，想要永久设置，需要走二三方案并重启系统。

解决完成之后connect-mongo报了新错误`Connection strategy not found`，再次[查询](https://github.com/nswbmw/N-blog/issues/105)得知，修改了参量传递，问题解决

然后又`express-session`报了新警告，[查询](http://stackoverflow.com/questions/23773537/how-are-connect-mongo-mongostore-sessions-actually-saved)得知m，增加了两个默认参量，问题解决

mongoose 定义类方法 `类Schema.statics.方法名 = 函数`，[参考 MEAN Web Development]

momgoose 定义实例方法 `类Schema.method.方法名 = 函数`，[参考 MEAN Web Development]

一个模块加载顺序导致的bug

服务器的req.body一直是undefined，折腾了一上午，控制台一直无法获得请求体的内容，后来去查了一下req.body获取不到的情况，根据别人的问题检查了jade模板，发现post方法被写在了button上，改到form上之后故障依旧，再参考其他问题，有人提到了[模块加载顺序的问题](http://www.hubwiz.com/exchange/55eef7bb8e96ca372f9b606f)/[模块加载顺序的问题](http://cnodejs.org/topic/54c35a3e0d075f173d433e94)，按照这个思路检查了app.js，发现路由引入在了各种paser之引入前，颠倒加载顺序之后，故障排除

2016.03.06

完成了登录页面的功能

对于脚本的加载，利用jade的条件渲染和res.render传参，实现了分页面不同加载不同脚本的功能，避免在每个页面下加载冗余的脚本

同样的原理，也实现了样式表按需加载。

进一步分离js文件，前端的公共js库放在public/javascripts/utils.js中，后端的公共库放在service/services.js中。对于不涉及数据库读写的功能，一般放在了前端执行，设计数据库读写的（比如用户重名验证等），则由前端发起ajax请求向后端查询。尽可能减少和后端的交互，以优化网络性能。

在验证用户重名时，负责向后端发起查重请求的函数被放在了前端公共库中，而调用这个查重函数的函数则放在了本页的reg.js中。查重函数中有AJAX状态的异步回调。问题出现在，如何将回调的结果传回调用者，如果只是return状态的话，因为回调机制的影响，调用者一定会收到false状态。后来不得不使用了同步+超时检测机制来解决，不知道有没有更好的方法，在保证功能分离的前提下实现结果回传。


2016.03.08

今天重点解决一个问题，就是关于上面的密码在服务器验证的AJAX问题，在注册页中，利用同步可以解决问题，但是在接下来设计登录页中时，再次遇到了同样的问题。代码的流程是login.js中，由登录按钮触发utils.log.verifily方法，方法中有ajax向服务器post用户密码，服务器验证之后返回code值，ajax回调函数中判断当服务器返回后，根据
code值返回自己对应的boolean值，在将其返回至login.js中。但是问题出现在了，回调函数是异步调用的，调用之前返回值一直是false，造成判断错误。

解决方案：
boolean值在回调中声明，但return找不到值？

找到解决方案了，使用回调函数来解决

一个小知识蒙圈了，关于定时器变量的访问问题，首先定时器是window的功能，是全局可见的。而如果我在函数内部定义了一个定时器变量，那么按照作用域的知识，在外面应该是访问不到这个变量的。但又由于定时器是全局的，那么我在内部定义的定时器变量会不会与外界冲突？

经过测试之后得知，定时器在作用域内部可以通过变量访问，但这个定时器变量指向的定时器在全局上则只能以索引的形式访问。不会引发变量名冲突

- [ ] 关于错误传递

2016.03.09

由于受到昨天关于回调函数和错误传递的启发，今天对服务器公用方法进行单例封装到service.js中

在封装到数据库查询get用户的时候遇到了问题，在这个封装中，当数据库调用结束后会触发一个回调函数，回传错误或者数据或者空数据，在路由器中，这个回调函数一般是res.send()，那么问题出现在了参数传递上，错误/数据/boolean应该放在第几位，是不是需要包装成一个对象？这样我们 需要继续回去看express源码，来了解参数如何传递了。还要参考[官网api](http://expressjs.com/en/4x/api.html#res.send)。

对于res.send()的参数，通用的情况只传递一个参数，如果传入了多个参数，将被作为状态码等被处理。为了防止被误处理，我们这里采用send只传递一个对象来传递错误/code/和返回的查询对象，同时为了避免把查询对象也返回给客户端造成信息泄露，查询对象的返回enable是可选的，这样在服务器内部使用查询对象来检测用户名/邮箱重复问题，服务器外部只返回boolean，保证了用户信息安全

- [ ] 需要再增加邮件的重复验证

今天最后遇到了cookie和session问题

2016.03.10

- [ ] 深入查询session/cookie/缓存的知识

FF的session中并没有存储user值(数据库里也没有)，所以每次服务器渲染数据时找user.name会报undefined

Chrome的session正常

上面的错误在登出响应做好后消除

- [ ] 优化所有的事件绑定为二级绑定

- [ ] 为了让页面的风格统一，在访问有登录权限控制的页面时，需要重定向回一个独立的登录页面，免得还要在主页上增加提示，影响页面统一性。还可以将主页登录框的错误（如密码错误，用户名不存在等）的跳转重定向到这里，避免提示影响主页风格

实现了问卷页的权限控制