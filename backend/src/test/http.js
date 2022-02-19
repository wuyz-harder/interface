const http = require("http")
const fs = require("fs")

const buf = Buffer.from("hello")

const read = fs.createReadStream("./test.txt",{encoding:'utf8'})
const app = http.createServer((req,res)=>{
    console.log(buf)
    
    res.end(buf)
})

app.listen(8181,"127.0.0.1",()=>{console.log("listening...")})