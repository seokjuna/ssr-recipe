import { combineReducers } from "redux";
import users from "./users";

// 루트 리듀서를 만들고, Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용
const rootReducer = combineReducers({ users });
export default rootReducer;