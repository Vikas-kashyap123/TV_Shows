import { combineReducers, createStore } from "redux";

const reducer = combineReducers({});

const store = createStore(reducer)

export type State = ReturnType<typeof reducer>;

export default store;