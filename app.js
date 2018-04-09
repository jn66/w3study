//加载express模块
var express = require('express');

var swig = require('swig');

// 加载数据库模块
var mongoose  = require('mongoose');

//创建app应用  Http.createServer();
var app = express();

//设置静态文件托管 ,当访问public的时候，使用后面的方式处理。把前面的路径指向后面
//当用户访问的url以/public 开始，直接返回对应的右边的目录下
app.use('/public',express.static(__dirname + '/public'));

//-----配置应用模板--------
//定义当前模板用的模板引擎 第一个参数模版引擎的名称模版的后缀，第二个参数表示用于处理模版内容的方法

app.engine("html",swig.renderFile);
//设置模版文件存放的目录,第一个参数是views，第二个参数是目录
app.set('views','./views')
//注册所有使用的模板引擎，第一个参数是view engine, 第二个参数和engine定义的第一个参数是一致的
app.set('view engine', 'html');
//开发过程中需要取消模板缓存
swig.setDefaults({cache:false});

// 根据不同功能 划分模块
// 前台模块 - 后台管理模块 - api模块  app.use('/admin',require('./router/admin'))

app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

//测试一下 模板引擎
app.get('/test', function(req, res, next){
  //读取views目录下的指定文件，解析并返回客户端，
  // 第一个参数，模板文件，相对于views目录。会找到views/index.html
  // 第二个参数，传递给模板使用的数据
  res.render("index");
})

//这段就测试下，实际上用静态文件托管来替代
app.get('/main.css',function(req,res,next){
  //默认发送html，现在要发送css格式。不然没法解析成css
  res.setHeader('content-type','text/css');
  res.send("body{background:red;}")
})
//监听http请求
console.log("show me the code")

// 如何使用mongoose操作数据库呢
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
mongoose.connect("mongodb://localhost:8889/blog",function(err){
  if(err){
    console.log("连接失败");
  }else{
    console.log("连接成功");
    app.listen(8888);
  }
});


//用户发送http请求 ->url -> 解析路由 ->找到匹配规则 - 制定绑定函数 - 返回对应内容 - 用户
//如果访问/public -> 静态 直接读取目录下文件
//动态 -> 处理业务逻辑 -> 加载模板 解析模板 -> 返回数据

