import { call, put } from "redux-saga/effects";
import { Action } from "../actions";
import { DetailsLoadedAction } from "../actions/Details";
import { ShowsLoadedAction } from "../actions/show";
import { getCasts, searchShows, showDetails } from "../api";

export function* fetchShows(action: Action): Generator<any, any, any> {
  const shows = yield call(searchShows, action.payload);
  yield put(ShowsLoadedAction(shows));
  console.log("shows", shows);
}

export function* fetchDetails(action: Action): Generator<any, any, any> {
  const dShow = yield call(showDetails, action.payload);
  yield put(DetailsLoadedAction(dShow));
}
