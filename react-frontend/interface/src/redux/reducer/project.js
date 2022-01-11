

const initstate = {
    project : [{
        key: 1,
        project_name: 'John',
        maker: 32,
        interface_number: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      },{
        key: 2,
        project_name: 'John',
        maker: 32,
        interface_number: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      }]
}

export const projectreduce = (state=initstate,action)=>{
    console.log(state)
    switch(action.type){
        case "ADD_PROJECT":
            return {...state,project:[...state.project,action.data]}
        case "DEL_PROJECT":
            return { project:state.project.filter((item,index)=>{
                return item.key !== action.data
            })}
        default:
            return state
    }
}