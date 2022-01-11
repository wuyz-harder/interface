import {connect} from "react-redux"

import project from "./project"

const data_props= state => ({
    project:state.project
})
const fun_props = dispatch =>({
add:() => { dispatch({type:"ADD_PROJECT",data:{
    key: 2,
    project_name: 'John',
    maker: 32,
    interface_number: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  }}
  )
},
del:(index)=>{
    dispatch({type:"DEL_PROJECT",data:index})
}
})

export default connect(data_props,fun_props)(project)