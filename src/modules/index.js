import { combineReducers } from "redux";
import users from "./users";

// 루트 리듀서를 만들기
const rootReducer = combineReducers({ users });
export default rootReducer;