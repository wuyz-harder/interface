const initstate = {
    interface : []
}

export const interfacereduce = (state=initstate,action) =>{
    
    switch(action.type){
        // case "ADD":
            // return {interface:[...state.interface,action.data]}

        // case "DEL":
        //     return {interface:state.interface.filter((item,index)=>{
        //         return index !==action.data
        //     })}
        default:
            return state
    }
}