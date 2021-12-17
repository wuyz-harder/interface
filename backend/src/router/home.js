const express = require("express")
const router = express.Router()
const db = require('../utils/db')
router.get("/get_project",(req,res)=>{
     console.log(22)
        db("select * from project").then((data)=>{
            res.json(data)
        }).catch(err=>{
            res.json(err)
        })
})
router.post("/add_project",(req,res)=>{
    let project_name = req.body.project_name
    let interface_number  = req.body.interface_number
    let description = req.body.description
    let maker = req.body.maker
    db("INSERT INTO interface.project (`project_name`, `interface_number`,`description`,`maker`) VALUES ( " +
     "'" + project_name + "'"  + ","+  "'" + interface_number + "'" + ","+  "'" + description + "'" + "," +  "'" + maker + "' );").then(data=>{
        res.json({"msg":"插入成功","code":200})
     }).catch(err=>{
        res.json({"msg":"后台出错","code":500})
     })
    
    
})
module.exports = router
