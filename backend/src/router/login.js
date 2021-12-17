const express = require("express")
const db = require("../utils/db")
const jwt = require("../utils/jwt")
const router = express.Router()
router.post("/",(req,res)=>{
    console.log("${req.body.user_name}")
        db("select * from interface.user where user_name =" + "'" + req.body.user_name.toString() + "'" + " and password=" + req.body.password ).then(data=>{
            if (data.length == 0){
                res.status = 404
                res.json({"msg":"账号或密码错误","code":"404"}) 
            }else{         
                res.status = 200
                let token = jwt.genToken(req.body.user_name.toString())
                res.json({"msg":"登录成功","code":"200","token":token})
            }
        }).catch(err=>{
            res.status = 500
            
        })
})

module.exports = router