import { produce } from "immer";
import { normalize, schema } from "normalizr";
import { Action } from "../actions";
import { DETAILS_LOADED, LOADING_DETAILS } from "../actions/Details";
import { SHOWS_LOADED, SHOWS_QUERY_CHANGE } from "../actions/show";
import { Show } from "../models/Show";

type normalizeShows = {
  [showId: number]: Show;
};
export type State = {
  shows: normalizeShows;
  query_shows: { [query: string]: number[] };
  query: string;
  loading: boolean;
  show_loading: { [showId: number]: boolean };
};
export const initialState: State = {
  shows: {},
  query: "",
  loading: false,
  query_shows: {},
  show_loading: {},
};

const showsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SHOWS_LOADED:
      return produce(state, (draft) => {
        const shows = action.payload.map((item: any) => item.show) as Show[];

        if (!shows || shows.length === 0) {
          return;
        }

        const showsEntity = new schema.Entity("shows");
        const normalizedData = normalize(shows, [showsEntity]);
        draft.query_shows[draft.query] = normalizedData.result;

        draft.shows = { ...draft.shows, ...normalizedData.entities.shows };
        draft.loading = false;
      });
    case SHOWS_QUERY_CHANGE:
      return produce(state, (draft) => {
        draft.query = action.payload as string;
        draft.loading = true;
      });
    case DETAILS_LOADED:
      return produce(state, (draft) => {
        const show = action.payload as Show;
        // const showEntity = new schema.Entity("show");
        // const normalizedDetails = normalize(show, showEntity);
        // draft.shows[show.id] = normalizedDetails.entities.show![show.id];
        draft.shows[show.id] = show;
        draft.loading = false;
      });
    case LOADING_DETAILS:
      return produce(state, (draft) => {
        draft.loading = true;
      });

    default:
      return state;
  }
};
export default showsReducer;
