//session 是  express-session 的配置信息,session名称，加密🔑
//其他地方导入之后，const config = import(./config/default)
// config.port 获取到端口号码
module.exports = {
  port: 8889,
  info: "welcome to xatu",
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:8889/myblog'
}
