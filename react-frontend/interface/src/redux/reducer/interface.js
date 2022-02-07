import {get} from "../../api/api"
import store from "../store/store"
const get_uri = "/interface/get_interface"

get(get_uri).then(res =>{
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
                return item.id !==action.data
            })}
        default:
            return state
    }
}