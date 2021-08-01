import {combineReducers} from "redux";
import query from "./query";
import ui from "./ui";

const rootReducer = combineReducers({query, ui});
export default rootReducer;