var express = require('express');
var router = express.Router();


router.use(function(req,res,next){
    //判断userinfo.admin 是否为true 判断是否为管理员
    next();
})

//不用写 admin/user
router.get('/',function(req,res,next){
    res.render('admin/index');
});
module.exports = router;