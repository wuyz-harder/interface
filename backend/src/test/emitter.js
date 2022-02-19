const Evenemitter = require("events")
const emit = new Evenemitter()
emit.on("test",()=>{console.log('test')})
emit.emit("test")