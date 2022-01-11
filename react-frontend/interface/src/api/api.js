
import axios from "axios";
export  function get(url,params){
    return Promise((resolve,reject)=>{
        axios.get(url,params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}

export function post(url,params){
    return Promise((resolve,reject)=>{
        axios.post(url,params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
export function del(url,params){

    return new Promise((resolve,reject)=>{
        axios.delete(url,params).then(res => {
            resolve(res)

        }).catch(err => {
            reject(err)

        })
    })
}