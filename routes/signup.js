const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
const express = require('express');
const router = express.Router();

const UserModel =  require('../models/users')
const checkNotLogin = require('../models/check').checkNotLogin

// GET /signup 注册页面

router.get('/', checkNotLogin, function(req,res,next){
  res.render("signup");
})

//POST /signup 用户注册的请求
router.post('/', checkNotLogin, function(req,res,next){
  const name =  req.fields.name
  //从文件为头像的对象中，找到完整的绝对地址，用split分离地址的每个部分后，用pop()返回了这个文件的文件名，很有趣。
  const avatar =  req.files.avatar.path.split(path.sep).pop()
  let password = req.fields.password
  //合法性检验
  try {
    if(!(name.length >= 1 && name.length <= 10)){
      throw new Error ('名字1-10个字')
    }
    if(!req.files.avatar.name){
      throw new Error('你的头像呢')
    }
    if(password.length < 6){
      throw new Error('密码怎么也得6个字符，不然我就知道了哦')
    }
  }catch(e){
    //注册失败 异步删除上传的头像
    fs.unlink(req.files.avatar.path)
    req.flash('error', e.message)
    return res.redirect('/signup')
  }
  //密码加密
  password = sha1(password)

  //整理下要写入数据库的内容
  let user = {
    name:name,
    password:password,
    avatar:avatar
  }

  //现在开始写入数据库
  UserModel.create(user).then(
    function(result){
      //数据库返回了全部的结果，这个user是插入数据库后的值，所以包括了_id
      user = result.ops[0]
      //删除密码信息
      delete user.password
      //从返回的user中写入session
      req.session.user = user
      //写入flash 这个时候就真的注册成功了
      req.flash('success','注册成功')
      //跳转到首页
      res.redirect('/post')
    }).catch(function(e){
      //注册失败，这个时候的失败是写入数据库的失败
      fs.unlink(req.files.avatar.path)
      //用户名被占用返回注册页面 不返回错误页面
      if(e.message.match('duplicate key')){
        req.flash('error','用户名被占用啦')
        return res.redirect('/signup');
      }
      next(e)
    })
})


module.exports = router
