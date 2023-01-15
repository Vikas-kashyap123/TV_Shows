import { State } from "../store";
import { createSelector } from "reselect";

export const castSateSelector = (state: State) => state.cast;

export const castMapSelector = createSelector(castSateSelector, (castState) => {
  return castState.cast;
});

export const castLoadingSelector = createSelector(
  castSateSelector,
  (cast) => cast.loading
);

export const castSelector = createSelector(castMapSelector, (normalize) =>
  Object.keys(normalize).map((castId) => normalize[+castId])
);
