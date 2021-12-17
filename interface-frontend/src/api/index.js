import axios from 'axios'


function get(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,params).then(data=>{
            console.log(data)
            resolve(data.data)
            
        }).catch(err =>{
            reject(err)
        })
    })
}

function post(url,data){
    return new Promise((resolve,reject)=>{
        try{
         axios.post(url,data).then(data=>{
            resolve(data)
        }).catch(err=>{
            reject(err)
        })
        }catch{
            reject("网络请求出错了")
        }
    })
}
function del(url,params){
    return new Promise((resolve,reject)=>{
        axios.delete(url,{params:params}).then(data=>{
            resolve(data)
        }).catch(err=>{
            reject(err)
        })
    })

}

export {get,post,del}