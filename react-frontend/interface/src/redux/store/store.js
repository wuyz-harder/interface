import {createStore,combineReducers} from "redux"
import { interfacereduce } from "../reducer/interface"
import { projectreduce } from "../reducer/project"
import {logreduce} from "../reducer/log"

const reducers = combineReducers({
    interface:interfacereduce,
    project:projectreduce,
    log:logreduce
})
const store  = createStore(reducers)
export default store