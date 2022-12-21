import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import users, { usersSaga } from "./users";

// 루트 사가 만들기
export function* rootSaga() {
    yield all([usersSaga()]);
}

// 루트 리듀서를 만들기
const rootReducer = combineReducers({ users });
export default rootReducer;