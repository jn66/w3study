// 加载依赖包
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash =  require('connect-flash');
const config = require('./config/default');
const routers = require("./routes");





const app = express();

//设置存放模板的目录
app.set('views',path.join(__dirname, 'views'));
//设置模板引擎为ejs
app.set('view engine', 'ejs');


// 托管静态文件，这个目录下面的文件可以直接访问了 app.use(express.static("public"));
// 如/public/bootstrap.css   输入网址 localhost:1234/bootstrap.css
// 如果第一个参数是目录的话，就会创造虚拟路径，也就是localhost:1234/public/bootstrap.css 才能访问
app.use("/public",express.static(path.join(__dirname, "public")));



//加载mongoose操作数据库
// const Mongolass = require('mongolass');
// const Schema = Mongolass.Schema
//连接数据库
//const mongolass = new Mongolass("mongodb://localhost:8889/myblog");
//表结构
// const UserSchema = new Schema('UserSchema', {
//   username: { type: 'string', required: true },
//   password: { type: 'string' }
// })
//定义user这个表/collection  用这个结构
// const User = mongolass.model('User', UserSchema);
// User.index({username:1},{unique:true}).exec();

//session 中间件
app.use(session({
  name: config.session.key, //设置cookie保存的字段id名称
  secret: config.session.secret, //设置secret计算hash值存在cookie中 防篡改
  saveUninitialized: false, //设置为false，强制创建一个session，即使用户未登录
  resave:true, //强制更新session
  cookie:{
    maxAge:config.session.maxAge //过期时间，过期后cookie中的session id自动删除
  },
  store: new MongoStore({ //将session存储到mongodb
    url: config.mongodb
  })
}))


// flash 中间件，用来显示通知
app.use(flash())

//处理表单以及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname,'public/img'),  //上传文件目录
  keepExtensions: true //保留后缀
}));

// 设置模板全局常量

app.locals.blog = {
  title : "cnki-pro",
  description: "this is cnki blog"
}


//添加模板必须的三个变量
app.use(function(req,res,next){
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})
//路由
routers(app)

// app.get('/gogogo',function(req,res,next){
//   req.session.user="wa lala  my name is user";
//   console.log(config1.info);
//   res.render('index');
// });
// app.get('/publish',function(req,res,next){
//   res.render('publish');
// });
// app.get('/login',function(req,res,next){
//   res.render('login');
// });


// function check(req,res,next){
//   next();
// }
// app.get('/register',check,function(req,res,next){
//   console.log(req.session.user);
//   console.log(req.session.value);
//   console.log(req.session.user);
//   res.render('register',{username:'lucy'});
// });



// app.get('/api/register',function(req,res,next){
//   console.log(req.query);
//   res.send("aaa");
// });

// app.post('/api/register',function(req,res,next){
//   res.send("aaa");
//   const username =  req.fields.username;
//   const password =  req.fields.password;
//   let userdata ={
//     username : username,
//     password : password
//   }
//   console.log(userdata);
//   User.create(userdata).exec().then(console.log("gogogo")).catch(function(e){
//     console.error(e);
//   });
//   res.send("bbb");
// });

//监听端口，启动程序
app.listen(3001,function(){
    console.log("服务器开启^-^开始监听3001端口")
})
