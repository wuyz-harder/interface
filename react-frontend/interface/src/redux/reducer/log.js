import {get} from "../../api/api"
import store from "../store/store"
const get_log_uri = "/log/get_log"
get(get_log_uri).then(res =>{
    console.log(res)
    store.dispatch({type:"LIST_LOG",data:res.data.data})
}).catch(err=>{
    alert(err)
    console.log("error")
})

const initstate = {
    log : []
}

export const logreduce = (state=initstate,action) =>{
    
    switch(action.type){
        case "LIST_LOG":
            return {log:action.data}
        case "ADD":
            return {log:[...state.log,action.data]}

        case "DEL_LOG":
            return {log:state.log.filter((item,index)=>{
                return item.id !==action.data
            })}
        default:
            return state
    }
}

