const express = require("express")
const router = express.Router()
const db = require('../utils/db')
const clients  = require(__dirname + "/websocket.js")[1]
router.get("/get_people",(req,res)=>{
    db("SELECT pl.id,pl.user_name,pl.phone_number,pl.skill,pl.group,pj.project_name FROM interface.people pl, interface.project pj where pl.project_id= pj.id;").then((data)=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
})
router.delete("/delete_people",(req,res)=>{
    var id = req.query.id
    var del_name = req.query.name
    var maker = req.query.maker
    clients.forEach(item => {
        if(item.user == del_name){
            item.ws.send("你已经被删除，操作者:" + maker)
        }
    });
    db("delete from interface.people where interface.people.id=" + id).then((data)=>{
        res.json({"msg":"删除成功"})
    }).catch(err=>{
        res.json({"msg":"删除失败"})
    })
})
router.post("/add_people",(req,res)=>{
    var user_name = req.body.user_name
    var group = req.body.group
    var project_id = req.body.project_id
    var phone_number = req.body.phone_number
    var skill = req.body.skill
    db("INSERT INTO interface.people (`user_name`, `group`, `project_id`, `phone_number`,`skill`) VALUES ( " +
    "'" + user_name + "'"  + ","+  "'" + group + "'" + ","+  "'" + project_id + "'" + "," +  "'" + 
    phone_number + "'" + "," +  "'" + skill + "');").then((data)=>{
        res.json({"msg":"新增成功"})
    }).catch(err=>{
        
        res.json({"msg":"新增失败","code":500})
    })
})
router.post("/update_people",(req,res)=>{
    // const user ={id:6,name:'zz',age:18}
    const user = {
        user_name :req.body.user_name,
        group:req.body.group,
        project_id:req.body.project_id,
        phone_number:req.body.phone_number,
        skill:req.body.skill,
        id:req.body.id
    }
    const sql = 'UPDATE `people` SET ? WHERE id = ?' 
    db(sql,[user,user.id]).then((data)=>{
        console.log(111)
        res.json({"msg":"修改成功"})
    }).catch(err=>{
        
        res.json({"msg":"修改失败","code":500})
    })
})
module.exports = router