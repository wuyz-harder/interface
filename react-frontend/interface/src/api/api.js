
import axios from "axios";
axios.defaults.headers.common["token"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1eXoiLCJpYXQiOjE2NDE4OTI0NzMsImV4cCI6MTY0MTk3ODg3M30.U0m5Wi3lEONSBqsdhgXnFFQFXCb7ee-wcnvsy0wxDjA"
export  function get(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
export function post(url,params){
    return new Promise((resolve,reject)=>{
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