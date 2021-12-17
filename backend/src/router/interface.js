const express = require("express")
const router = express.Router()
const db = require('../utils/db')
router.get("/get_interface",(req,res)=>{
    console.log(typeof db)
    db("SELECT itf.id,itf.interface_name,itf.url,itf.method,pj.project_name FROM interface.interface itf,interface.project pj where itf.project_id =pj.id;").then((data)=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
})
router.delete("/delete_interface",(req,res)=>{
    var id = req.query.id
    db("delete from interface.interface where interface.interface.id=" + id).then((data)=>{
        res.json({"msg":"删除成功"})
    }).catch(err=>{
        res.json({"msg":"删除失败"})
    })
})
router.post("/add_interface",(req,res)=>{
    var interface_name = req.body.interface_name
    var url = req.body.url
    var project_id = req.body.project_id
    var  method = req.body.method
    db("INSERT INTO interface.interface (`interface_name`, `url`, `project_id`, `method`) VALUES ( " +
    "'" + interface_name + "'"  + ","+  "'" + url + "'" + ","+  "'" + project_id + "'" + "," +  "'" + 
    method + "');").then((data)=>{
        res.json({"msg":"新增成功"})
    }).catch(err=>{
        
        res.json({"msg":"新增失败","code":500})
    })
})
module.exports = router