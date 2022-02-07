
import axios from "axios";
const base_url = "http://localhost:3001
// axios.defaults.headers.common["token"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1eXoiLCJpYXQiOjE2NDIxMjcwNDksImV4cCI6MTY0MjIxMzQ0OX0.HXRPGObLAgk_WMIVYWZnv5T5hcMDEWiAs8705gMfvak"
export  function get(uri,params){
    return new Promise((resolve,reject)=>{
        axios.get(base_url + uri,params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
export function post(uri,data){
    return new Promise((resolve,reject)=>{
        axios.post(uri,data).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
export function del(uri,params){

    return new Promise((resolve,reject)=>{
        axios.delete(url,params).then(res => {
            resolve(res)

        }).catch(err => {
            reject(err)

        })
    })
}