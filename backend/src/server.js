const express = require("express")
var expressWs = require('express-ws');
const bodyparse = require("body-parser")
const morgan = require("morgan")
const app = express()
const port = 8888
const jwt = require("./utils/jwt")
expressWs(app)
app.use(morgan("dev"))
app.use(bodyparse.json())
app.use(bodyparse.urlencoded({ extended: true }))
app.all("*",(req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers, Platform, Token, Uid,Authorization')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD')
  if(req.method == "OPTIONS" ){
    console.log("opt")
    next()
  }
  else if(req.originalUrl == "/login" || req.originalUrl == "/websocket/.websocket"){
    next()
  }else{
  jwt.vertifyToken(req.headers.token).then(res=>{
    // 如果有效则放行
    next()
  }).catch(err=>{
    // 响应拦截
    return res.json({ code:401,msg:"请先登录",data:""})
  })
}
})
app.use("/home",require(__dirname + "/router/home.js"))
app.use("/login",require(__dirname + "/router/login.js"))
app.use("/people",require(__dirname + "/router/people.js"))
app.use("/log",require(__dirname + "/router/log.js"))
app.use("/interface",require(__dirname + "/router/interface.js"))
app.use("/websocket",require(__dirname + "/router/websocket.js")[0])
app.use("/upload",require(__dirname + "/router/upload.js"))
app.listen(port,()=>{
    console.log("express listen on " + port.toString())
})
// 错误拦截器
app.use((err,req,res,next)=>{
  if(err){
    res.json(err.message)

  }else{
    next()
  }
})



