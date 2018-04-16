//session 是  express-session 的配置信息
module.exports = {
  port: 8888,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:8889/myblog'
}

