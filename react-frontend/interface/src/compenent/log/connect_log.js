import {connect} from "react-redux"
import log from "./log"

const transfer_log_props = state =>({
    log:state.log
})
const transfer_log_method = dispatch=> ({
    del:(index)=>{
        dispatch({type:"DEL_LOG",data:index})
    }
    
})

export default connect(transfer_log_props,transfer_log_method)(log)