const express = require('express')
const router = express.Router()

const checkLogin = require("../models/check").checkLogin

// 文章列表页   /posts
router.get('/',function(req,res,next){
  res.render("index");
})

// POST /posts/create 发表一篇文章的post请求
router.post('/create',checkLogin,function(req,res,next){
  res.send('发表文章')
})

//GET /posts/create 发表文章页

router.get('/create', checkLogin, function(req,res,next){
  res.send('发表文章的页面')
})

//Get /posts/:postId 单独的一篇文章页面
router.get('/:postId',function(req,res,next){
  res.send('文章详情页面 单独的一篇文章')
})

//GET /posts/:postId/edit 更新文章的页面
router.post('/:postId/edit',checkLogin,function(req,res,next){
  res.send("更新文章");
})

//POST /posts/:postId/edit 更新一篇文章的post请求
router.get('/:postId/edit', checkLogin, function(req,res,next){
  res.send('更新文章')
})

//GET /posts/:postId/remove 删除一篇文章 用GET就行
router.get('/:postId/remove', checkLogin, function(req,res,next){
  res.send('删除文章')
})

module.exports = router
