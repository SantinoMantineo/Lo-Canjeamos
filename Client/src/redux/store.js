import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk"; // Cambia "reducer" a "redux-thunk"
import rootReducer from "./reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;