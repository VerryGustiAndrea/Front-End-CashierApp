import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducers from "./reducer/index";
import promiseMiddleware from 'redux-promise-middleware'

const logger = createLogger();
const enhancers = applyMiddleware(logger, promiseMiddleware);

const store = createStore(reducers, enhancers);

export default store;
