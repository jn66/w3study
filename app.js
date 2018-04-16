// 加载依赖包
const path = require('path');
const express = require('express');
const session = require('express-session')
//const bodyParser = require('body-parser');
//const session = require('express-session');
//const MongoStore = require('connect-mongo')(session);




const app = express();
//我的配置哈哈哈

const config = {
  port: 8888,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:8889/myblog'
}
//设置存放模板的目录
app.set('views',path.join(__dirname, 'views'));
//设置模板引擎为ejs
app.set('view engine', 'ejs');


// 托管静态文件，这个目录下面的文件可以直接访问了 app.use(express.static("public"));
// 如/public/bootstrap.css   输入网址 localhost:1234/bootstrap.css
// 如果第一个参数是目录的话，就会创造虚拟路径，也就是localhost:1234/public/bootstrap.css 才能访问
app.use("/public",express.static(path.join(__dirname, "public")));




//加载mongoose操作数据库
const Mongolass = require('mongolass');
const Schema = Mongolass.Schema
//连接数据库
const mongolass = new Mongolass("mongodb://localhost:8889/myblog");
//表结构
const UserSchema = new Schema('UserSchema', {
  username: { type: 'string', required: true },
  password: { type: 'string' }
})
//定义user这个表/collection  用这个结构
const User = mongolass.model('User', UserSchema);
User.index({username:1},{unique:true}).exec();
//用session
app.use(session({
  name:"aaabbbccc",
  secret:"it is a secret"
}))

app.use(require('express-formidable')({}));

app.get('/',function(req,res,next){
  res.render('index');
});
app.get('/publish',function(req,res,next){
  res.render('publish');
});
app.get('/login',function(req,res,next){
  res.render('login');
});
app.get('/register',function(req,res,next){
  res.render('register',{username:'lucy'});
});


app.get('/users/:name',function(req,res){
  res.send(req.params.name);
})

app.get('/api/register',function(req,res,next){
  console.log(req.query);
  res.send("aaa");
});

app.post('/api/register',function(req,res,next){
  res.send("aaa");
  const username =  req.fields.username;
  const password =  req.fields.password;
  let userdata ={
    username : username,
    password : password
  }
  console.log(userdata);
  User.create(userdata).exec().then(console.log("gogogo")).catch(function(e){
    console.error(e);
  });
  res.send("bbb")
});

app.listen(3001,function(){
    console.log("服务器开启^-^开始监听3001端口")
})
