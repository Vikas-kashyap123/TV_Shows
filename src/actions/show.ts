import { ActionCreator } from ".";
import { Show } from "../models/Show";
import { ShowCast } from "../models/ShowCast";

export const SHOWS_LOADED = "SHOWS_LOADED";

export const ShowsLoadedAction: ActionCreator<ShowCast[]> = (
  shows: ShowCast[]
) => ({
  type: SHOWS_LOADED,
  payload: shows,
});

export const SHOWS_QUERY_CHANGE = "SHOWS_QUERY_CHANGE";

export const ShowsQueryChangeAction: ActionCreator<string> = (
  query: string
) => ({
  type: SHOWS_QUERY_CHANGE,
  payload: query,
});
