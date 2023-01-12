import { createSelector } from "reselect";
import { State } from "../store";

export const showsStateSelector = (state: State) => state.shows;

export const showsQuerySelector = createSelector(
  showsStateSelector,
  (showState) => showState.query
);

export const showLoadingSelector = createSelector(
  showsStateSelector,
  (show) => show.loading
);

export const showsMapSelector = createSelector(
  showsStateSelector,
  (showState) => showState.shows
);

export const queryShowsMapSelector = createSelector(
  showsStateSelector,
  (showsState) => showsState.query_shows
  
);

export const showsSelector = createSelector(
  showsMapSelector,
  showsQuerySelector,
  queryShowsMapSelector,
  (showsMap, query, queryShowMap) =>
     queryShowMap[query]?.map((showId) => showsMap[showId])
);
