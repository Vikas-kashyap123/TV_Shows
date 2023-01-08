

import { produce } from "immer";
import { normalize, schema } from "normalizr";
import { Action } from "../actions";
import { DETAILS_LOADED } from "../actions/Details";
import { SHOWS_LOADED, SHOWS_QUERY_CHANGE } from "../actions/show";
import { Show } from "../models/Show";

type normalizeShows = { [showId: number]: Show };
export type State = { shows: normalizeShows; query: string };
export const initialState: State = { shows: {}, query: "" };

const showsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SHOWS_LOADED:
      return produce(state, (draft) => {
        const showsArr = action.payload as Show[];
        const showsEntity = new schema.Entity("shows");
        const data = normalize(showsArr, [showsEntity]);
        draft.shows = data.entities.shows! || {};
      });
    case SHOWS_QUERY_CHANGE:
      return produce(state, (draft) => {
        draft.query = action.payload as string;
      });
    case DETAILS_LOADED:
      return produce(state, (draft) => {
        const show = action.payload;
        const showEntity = new schema.Entity("show");
        const data = normalize(show, showEntity);
        draft.shows[show.id] = data.entities.show![show.id];
      });

    default:
      return state;
  }
};
export default showsReducer;