const fs = require("fs")
const { Stream } = require("stream")
// const data = fs.readFileSync("./test.txt","utf8")

// fs.appendFile("./test.txt","sb",err=>{})
// console.log(data)

const fstream = fs.createReadStream("./test.txt")
const str = new Stream.Duplex({
    read(){}
}
)
str.push("dd")
fstream.push(str)

