//Menggabungkan Beberapa reducers menjadi 1 fungsi reducer
//menggunakan combineReducers

import { combineReducers } from "redux";
import countReducer from "./count";
import usersReducer from "./users";

const reducers = combineReducers({
  count: countReducer,
  users : usersReducer
});

export default reducers;
