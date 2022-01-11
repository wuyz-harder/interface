import {get} from "../../api/api"
import store from "../store/store"

get("http://localhost:8888/home/get_project").then(res =>{
    console.log(res)
    store.dispatch({type:"LIST_PROJECT",data:res.data})
}).catch(err=>{
    alert(err)
    console.log("error")
})
const initstate = {
    project : []
}

export const projectreduce = (state=initstate,action)=>{
    console.log(state)
    switch(action.type){
        case "LIST_PROJECT":
            return {project:action.data}
        case "ADD_PROJECT":
            return {...state,project:[...state.project,action.data]}
        case "DEL_PROJECT":
            return { project:state.project.filter((item,index)=>{
                return item.id !== action.data
            })}
        default:
            return state
    }
}