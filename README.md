﻿# w3study 项目动工
一段无声的自白，
一小群人的狂欢。

## 进度

- 项目起草
- 白皮书撰写
- 具体模块
- 产品原型
- 静态页面
- 资料收集
- 前端开发
- 后台开发
- 部署上线
- 测试
- 发布

## 内容

- 前端导航 https://github.com/helloqingfeng/Awsome-Front-End-learning-resource 
  - 卡片风格  http://panjiachen.github.io/vue-element-admin/#/dashboard
- javascript 手册 mozilla的中文手册或者w3school的中文手册
- Node 手册 官方中文手册
- Vue手册 官方中文文档
- javascript 教程 freecodecamp.cn
- javascript 练习
  - 英文题目 https://github.com/wesbos/JavaScript30
  - 中文解答 https://github.com/soyaine/JavaScript30

## 开发

npm i -g supervisor
supervisor --harmony app 执行后 文件更新自动重启服务器 爽歪歪

.\mongod --dbpath=F:\project\w3study\db --port=8889 开启数据库服务器

## 更新日志

2018.4.9

* 建立了基本的文档结构
* 建立了git仓库，并定期push代码到仓库内
* 使用node和express输出hello world
* 使用安装并模板引擎swig
* 使用express的路由功能，根据不同网址返回不同内容
* 安装并使用mongodb, 并在命令行中开启服务器 .\mongod --dbpath=F:\project\w3study\db --port=8889
* 安装并使用studio 3T, 连接了数据库，进行对mongodb进行可视化操作
* 安装并使用Mongoose, 连接了数据库

2018.4.10

* 使用Ajax将前端用户注册、登录数据提交给后端
* 对提交到后端的用户注册、登录数据进行非空验证。注册数据查询数据库，进行用户名重复性验证。登录数据查询数据库，返回前端登录信息。
* 对于登录成功的数据，写入cookie，保存用户登录状态。
* 点击退出按钮，删除cookie数据。
* 对于用户名非空验证，产生了一个bug，还不知道怎么修复

2018.4.11

* bug越来越多，准备重新梳理(重做)。
* 安装 supervisor，文件更新后会自动重启服务器，免去手工重启的麻烦。
* 深入理解router,并设定不同路由。
* 安装模板引擎ejs，了解ejs语法，并使用include功能包含网页头部和尾部。
* 安装了Eslint，但是不成功。报错缺少文件
* 安装了editorconfig，统一代码空格风格，但是没有看到明显效果。
* 建立了配置文件。config-lite可以根据不同的环境执行不同的配置文件。NODE_ENV=test node app会找test的配置文件。以NODE_ENV=production node app启动，会找production的配置文件。

2018.4.12

* 建立了router下的index文件，并管理注册、登录、登出、评论等的路由。
* 使用res.locals.user="xxx"和  app.locals.blog="xxx",向模板引擎传递参数。其中res.locals是不变的。app.locals是容易变的数据。
* 使用app.use(session())建立session，存储数据。不过还没测试成功。

2018.4.13

* 使用Mongolass新建数据库，增加、删除信息。
* 新建了几个静态页(首页、登录、注册)页

2018.4.14

* 研究会了原生的和使用jQuery的方法发送Ajax请求

2018.4.15

* 练习使用mongodb，学习数据的增删改查

2018.4.16

* 使用原生的form表达提交post请求到后端。后端接收到数据。
* 使用Ajax提交GET请求和POST请求到后端, 后端接收到数据。
* 后端接收到数据，写进数据库。
  * 问题1，建立数据库结构的时候，如果规定格式是纯数字，就不能写进字符串。这个错误没发现，耽误了2小时。
  * 问题2，E11000 duplicate key error collection，主键重复，这块耽误了2小时
    * use “你的数据库名” ,切换到你的项目的数据库下
    * 输入命令 db.users.getIndexes()  输出结果是包含多个对象的数组
    * 输入命令 db.users.dropIndex({"username":1})
    * 继续输入命令 db.users.dropIndex({你项目的key:value})  只保留一个 _id作为主键
    * 已经ok了。你也可以在输入 db.users.getIndexes() 查看是否只有一个_id
  * 问题3 插入数据之后必须catch()回调，这块不知道，又耽误了2小时！


2018.4.17

* 分离了路由，包括登录、登出、注册、评论的请求
* 分离了中间件，主要用来判断用户的session是否登录，给予不同的提示。

2018.4.18

* 完善了注册的静态页
* 写了注册user的数据库基本结构
* 创建了create函数，可以在数据库中创建用户
* 写了signup的路由，对用户名合法性进行了判断，并将注册成功的数据存到数据库
* 开发了头像上传功能，并能存到数据库
* 增加了2个bug

2018.4.19

* 完成了用户登录
* 完成了用户登出的功能


2018.4.24

* 梳理了全部代码，增加了注释
