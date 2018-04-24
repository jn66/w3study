/**
 * 加载依赖组件包
 */

const express = require('express'); //必须用的express
const compression = require('compression'); //好像可以压缩
const session = require('express-session'); //session管理
const bodyParser = require('body-parser'); //解析表单
const logger = require('morgan'); //日志组件
const chalk = require('chalk'); //改变console颜色的组件
const errorHandler = require('errorhandler'); //开发环境中的错误中间件
const lusca = require('lusca'); //增加安全性的中间件
const dotenv = require('dotenv'); //从env的文本文件中，解析出来好东西
const MongoStore = require('connect-mongo')(session); //把session 存到mongodb
const flash = require('express-flash'); //一次性提示消息
const path = require('path'); //路径
const mongoose = require('mongoose'); //数据库
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * 加载环境文件
 */
dotenv.load({path:'.env.example'});

/**
* 路由的目录引入, 先引入了4个路由
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
* 主要路由
*/
app.get('/', homeController.index);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);

/**
* 开启服务器
*/

app.listen(8889, () => {
  console.log("服务器开始了 8889");
});
