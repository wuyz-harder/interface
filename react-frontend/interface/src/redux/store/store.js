import {createStore,combineReducers} from "redux"
import {interfacereduce} from "../reducer/interface"
import {projectreduce} from "../reducer/project"


const reducers = combineReducers({
    interface:interfacereduce,
    project:projectreduce
})
const store  = createStore(reducers)
export default store