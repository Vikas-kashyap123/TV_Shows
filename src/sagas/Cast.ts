
import { call, put } from "redux-saga/effects";
import { Action } from "../actions";
import { CastLoadedAction } from "../actions/Cast";
import { getCasts } from "../api";

export function* fetchCast(action: Action): Generator<any, any, any> {
  const casts = yield call(getCasts, action.payload);
  yield put(CastLoadedAction (casts));
}