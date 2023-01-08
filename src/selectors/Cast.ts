import { State } from "../store";
import { createSelector } from "reselect";

export const castSateSelector = (state: State) => state.cast;

export const personMapSelector = createSelector(
  castSateSelector,
  (castState) => castState.cast
);

export const castSelector = createSelector(personMapSelector, (normalize) =>
  Object.keys(normalize).map((castId) => normalize[+castId])
);