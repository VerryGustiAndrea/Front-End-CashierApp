//Menggabungkan Beberapa reducers menjadi 1 fungsi reducer
//menggunakan combineReducers

import { combineReducers } from "redux";
import historyReducer from "./history";
import productReducer from "./product";

const reducers = combineReducers({
  product: productReducer,
  history: historyReducer
});

export default reducers;
