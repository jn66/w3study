//中间件，在get或者post的时候，可以传入这个函数，那么，请求就要先走这里面。
//请求会判断这个人session有没有登录信息，登录没有，如果登录了，就不让注册。如果
//如果没登录，就得先登录才能进行敏感操作。

module.exports = {
  checkLogin : function checkLogin(req,res,next){
    //如果session没有用户信息
    if (!req.session.user){
      //给flash的提示信息中存入未登录，用于前端展示
      req.flash('error','未登录')
      //跳转到注册页面让他注册去
      return res.redirect('/signin')
    }
    //去下一个请求去，这个请求结束了，啥也没干
    next();
  },
  checkNotLogin: function checkNotLogin(req,res,next){
    //如果session有用户信息
    if(req.session.user){
      //给flash的提示信息，存入已登录的信息，用于前端展示
      req.flash('error','已登录');
      //不让注册，回到之前的页面
      return res.redirect('back');
    }
    //去下一个请求去，这个请求结束了，啥也没干
    next();
  }
}
