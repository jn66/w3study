//加载express模块
var express = require('express');
var swig = require('swig');
//创建app应用  Http.createServer();
var app = express();

//-----配置应用模板--------
//定义当前模板用的模板引擎 第一个参数模版引擎的名称模版的后缀，第二个参数表示用于处理模版内容的方法

app.engine("html",swig.renderFile);
//设置模版文件存放的目录,第一个参数是views，第二个参数是目录
app.set('views','./views')
//注册所有使用的模板引擎，第一个参数是view engine, 第二个参数和engine定义的第一个参数是一致的
app.set('view engine', 'html');
//开发过程中需要取消模板缓存
swig.setDefaults({cache:false});
app.get('/', function(req, res, next){
  //读取views目录下的指定文件，解析并返回客户端，
  // 第一个参数，模板文件，相对于views目录。会找到views/index.html
  // 第二个参数，传递给模板使用的数据
  res.render("index");
})
app.get('/main.css',function(req,res,next){
  //默认发送html，现在要发送css格式。不然没法解析成css
  res.setHeader('content-type','text/css');
  res.send("body{background:red;}")
})
//监听http请求
app.listen(8888);