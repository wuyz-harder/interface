const express = require("express")
var router = express.Router()
const multer = require("multer")
const path = require("path")
var multipart = require("connect-multiparty")
var fs = require("fs")

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"../files/"))
    },
    filename:(req,file,cb)=>{
        var date = new Date();
        cb(null,file.originalname);
    }
})
let objMulter = multer({storage : storage });
router.post("/",objMulter.single('upload'),(req,res)=>{
        res.send("上传成功")
        console.log("收到一个文件:" + req.file.filename)
       fs.exists("../files/" + req.file.filename,exist => {
           if(exist){
                    console.log("ext")
                    console.log(fs.readFile("../files/" + req.file.filename))
           }else{
               console.log("nono")
           }

       })
           
       

})

module.exports = router