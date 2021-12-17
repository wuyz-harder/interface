const express = require("express")
const { isConstructSignatureDeclaration } = require("typescript")
const db = require("../utils/db")
const router = express.Router()
router.get("/get_log",(req,res)=>{
        db("select * from log").then(data=>{
            res.status = 300
            res.json(data)
        }).catch(err=>{
            res.status = 500
            res.json({"msg":"error"})
        })

})
router.post("/add_log",(req,res)=>{
    let detail = req.body.detail
    let user_name = req.body.user_name
    let time = req.body.time
    db("INSERT INTO interface.log (`detail`, `user_name`,`time`) VALUES ( " +
     "'" + detail + "'"  + ","+  "'" + user_name + "'" + ","+  "'" + time + "');")
    res.json({"mes":"插入成功","code":200})
})

module.exports = router