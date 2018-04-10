var express = require('express');
var router = express.Router();
var User = require('../models/User');
//统一返回格式

var responseData;
//初始化 不过还是不太懂 不用写函数也可以用啊
router.use(function(req, res,next){
    responseData ={
        code:0,
        message:''
    }
    next();
})
//不用写 admin/user
// 判断-1用户名不为空 2密码不为空 ，3用户名是否已经被注册 (数据库查询)
router.post('/user/register',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body);
    // 检查用户名是否为空
    if(username == ''){
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    // 检查密码是否为空
    if(password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    //用户名是否已经被注册，查询数据库
    User.findOne({
        username:username
    }).then(function(userInfo){
        if (userInfo){
            //数据库有记录
            responseData.code = 4;
            responseData.message = '用户名被注册';
            res.json(responseData);
            return;
        }
        //保存用户注册的信息到数据库
        var user = new User({
            username : username,
            password : password
        });
        return user.save();
    }).then(function(newUserInfo){
        console.log(newUserInfo);
        responseData.message = "注册成功";
        res.json(responseData);
    })

    
});
//登陆
router.post('/user/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + password);
    //查询数据中相同用户和密码记录是否存在，如果存在则登陆成功
    User.findOne({
        username: username,
        password: password
    }).then(function(userInfo){
        if(!userInfo){
            responseData.code = 2;
            responseData.message = "用户名密码错误";
            res.json(responseData);
            return;
        }
        responseData.message ="登录成功";
        responseData.userInfo ={
            _id: userInfo._id,
            username: userInfo.username
        }
        req.cookies.set('userInfo',JSON.stringify({_id: userInfo._id, username: userInfo.username}));
        res.json(responseData);
        return;
    })
})
// 退出
router.get('/user/logout',function(req,res){
    req.cookies.set('userInfo',null);
    responseData.message = '退出';
    res.json(responseData);
})
module.exports = router;