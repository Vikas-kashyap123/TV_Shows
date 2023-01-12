import { applyMiddleware, combineReducers, createStore } from "redux";
import showReducer from "./reducers/Show";
import createSagaMiddleware from "redux-saga"
import {  debounce, takeEvery, takeLatest } from "redux-saga/effects";
import { SHOWS_QUERY_CHANGE } from "./actions/show";
import { fetchDetails, fetchShows } from "./sagas/Shows";
import { composeWithDevTools } from "@redux-devtools/extension"
import castReducer from "./reducers/Cast";
import {  LOADING_DETAILS } from "./actions/Details";
import {  LOAD_CAST } from "./actions/Cast";
import { fetchCast } from "./sagas/Cast";

const reducer = combineReducers({
  shows: showReducer,
   cast: castReducer,
});


function* rootSaga(){
    yield debounce(200 ,SHOWS_QUERY_CHANGE,fetchShows )
     yield takeEvery(LOADING_DETAILS, fetchDetails);
  yield takeEvery(LOAD_CAST, fetchCast);
}


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type State = ReturnType<typeof reducer>;

export default store;
