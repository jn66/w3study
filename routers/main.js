var express = require('express');
var router = express.Router();

//不用写 admin/user
router.get('/',function(req,res,next){
    res.send('homepage');
});

module.exports = router;