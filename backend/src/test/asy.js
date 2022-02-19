async function test(){

   let a =  await new Promise((resolve,reject)=>{
        console.log(1)
        resolve(3)
    }).then(res=>{
        console.log(2)
        return res
    })

    console.log(a)
    return a
}
test().then(res=>console.log('a',res))