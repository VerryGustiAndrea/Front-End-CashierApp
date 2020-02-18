import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducers from "./reducer/index";

const logger = createLogger();
const enhancers = applyMiddleware(logger);

const store = createStore(reducers, enhancers);

export default store;
