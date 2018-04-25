/**
 * 加载依赖组件包 这个反正需要啥就加啥
 */

const express = require('express'); //必须用的express
const compression = require('compression'); //好像可以压缩
const session = require('express-session'); //session管理
const bodyParser = require('body-parser'); //解析表单
const logger = require('morgan'); //日志组件
const chalk = require('chalk'); //改变console颜色的组件 好像没啥用
const errorHandler = require('errorhandler'); //开发环境中的错误中间件
const lusca = require('lusca'); //增加安全性的中间件
const MongoStore = require('connect-mongo')(session); //把session 存到mongodb
const flash = require('express-flash'); //一次性提示消息
const path = require('path'); //路径
const mongoose = require('mongoose'); //数据库
const passport = require('passport');
const expressValidator = require('express-validator');
//const expressStatusMonitor = require('express-status-monitor'); 状态查看器
const sass = require('node-sass-middleware');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * 引入配置文件，和api的配置文件，以后可以用
 */

const config = require('./config/default');
const passportConfig = require('./config/passport');

/**
* 路由的目录引入, 先引入了4个路由文件，每个路由文件里，又有不同的路由配置
*/
const homeController= require('./controllers/home')
const userController = require('./controllers/user');
const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');


/**
 * 创建express的app
 */

const app = express();

/**
 * 连接数据库
 */
// mongoose.Promise = global.Promise; //不知道啥意思，别人这么写
// mongoose.connect(config.mongodb);  //从配置文件中获取mongodb的连接地址
// //如果连接出错，给出错误提示
// mongoose.connection.on('error', (err) => {
//   console.error(err);
//   console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
//   process.exit();
// });

/**
 * 基本express的配置
 */
app.set('views',path.join(__dirname,'views')); //设置模板引擎目录为views目录，当使用render的时候，会在这里找文件
app.set('view engine', 'pug'); //设置模板引擎为pug 原来叫jade
app.use(compression()); //启用引入的压缩插件，是一个压缩中间件
app.use(logger('dev')); //使用日志组件 记录报错
app.use(bodyParser.json()); //解析所有的请求 application/json
app.use(bodyParser.urlencoded({ extended: true })); //解析所有的请求 application/x-www-form-urlencoded
app.use(expressValidator()); //加载有效性验证的配置文件哦
app.use(session({  //配置session
  resave: true,
  saveUninitialized: true,
  secret: config.session.secret,
  cookie: { maxAge: config.session.maxAge }, // two weeks in milliseconds
  // store: new MongoStore({
  //   url: config.mongodb,
  //   autoReconnect: true,
  // })
}));
app.use(flash());  //加载提示信息中间件
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })); //配置静态文件目录 可以直接加载出来里面的文件

/**
* 主要路由
*/
app.get('/', homeController.index);
// app.get('/signup', userController.getSignup);
// app.post('/signup', userController.postSignup);

/**
* 开启服务器
*/

app.listen(8888, () => {
  console.log("服务器开始了 8888");
});
