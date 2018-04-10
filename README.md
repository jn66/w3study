# w3study 项目动工
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