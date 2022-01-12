import {get} from "../../api/api"
import store from "../store/store"

get("http://localhost:8888/interface/get_interface").then(res =>{
    console.log(res)
    store.dispatch({type:"LIST_INTERFACE",data:res.data})
}).catch(err=>{
    alert(err)
    console.log("error")
})



const initstate = {
    interface : []
}

export const interfacereduce = (state=initstate,action) =>{
    
    switch(action.type){
        case "LIST_INTERFACE":
            return {interface:action.data}
        case "ADD":
            return {interface:[...state.interface,action.data]}

        case "DEL":
            return {interface:state.interface.filter((item,index)=>{
                return index !==action.data
            })}
        default:
            return state
    }
}