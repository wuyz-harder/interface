console.log(1)
setImmediate(()=>{
    // 优先级最低
    console.log(2)  
})
setTimeout(()=>{
    // 优先级比setImmediate高，涉及到事件循环机制
    console.log(3)
},0)

new Promise((resolve,reject)=>{
    // 正常的执行堆栈
    console.log(4)  
    resolve("4-1") 
}).then(res=>{
    console.log(res)  
})

process.nextTick(()=>{
    // 打印完1后执行
    console.log(5)   
})