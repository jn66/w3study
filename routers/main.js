var express = require('express');
var router = express.Router();

//不用写 admin/user
router.get('/',function(req,res,next){
    console.log(req.userInfo._id+"----------");
    res.render("main/index",{
        userInfo:req.userInfo
    });
});

module.exports = router;