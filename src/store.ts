import { applyMiddleware, combineReducers, createStore } from "redux";
import showReducer from "./reducers/Show";
import createSagaMiddleware from "redux-saga"
import {  takeLatest } from "redux-saga/effects";
import { SHOWS_QUERY_CHANGE } from "./actions/show";
import { fetchDetails, fetchShows } from "./sagas/Shows";
import { composeWithDevTools } from "@redux-devtools/extension"
import castReducer from "./reducers/Cast";
import { DETAILS_LOADED, LOADING_DETAILS } from "./actions/Details";
import { CAST_LOADED, LOAD_CAST } from "./actions/Cast";
import { fetchCast } from "./sagas/Cast";

const reducer = combineReducers({
  shows: showReducer,
   cast: castReducer,
});


function* rootSaga(){
    yield takeLatest(SHOWS_QUERY_CHANGE,fetchShows )
     yield takeLatest(LOADING_DETAILS, fetchDetails);
  yield takeLatest(LOAD_CAST, fetchCast);
}


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof reducer>;

export default store;
