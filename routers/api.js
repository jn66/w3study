var express = require('express');
var router = express.Router();

//不用写 admin/user
router.get('/user',function(req,res,next){
    res.send('Api User');
});

module.exports = router;