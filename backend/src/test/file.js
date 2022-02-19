const fs = require("fs")
// const straem3 = fs.createReadStream("./test.txt")

// straem3.pipe(process.stdout)

const stream = require("stream")
const stream1 = new stream.Readable({read(){}})
const stream2 = new stream.Writable()
stream1.push("hello")
stream2._write = (chunk,enchding,next)=>{
    console.log(chunk.toString())
    next()
}
stream1.pipe(stream2)