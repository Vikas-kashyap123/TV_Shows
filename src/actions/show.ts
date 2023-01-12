import { ActionCreator } from ".";
import { Show } from "../models/Show";

export const SHOWS_LOADED = "SHOWS_LOADED";

export const ShowsLoadedAction: ActionCreator<Show[]> = (shows: Show[]) => ({
  type: SHOWS_LOADED,
  payload: shows,
});

export const SHOWS_lOADING = "SHOWS_lOADING"

export const ShowsLoadingAction: ActionCreator = ()=> ({
  type: SHOWS_lOADING,
})

export const SHOWS_QUERY_CHANGE= "SHOWS_QUERY_CHANGE";

export const ShowsQueryChangeAction: ActionCreator<string> = (query:string) => ({
  type: SHOWS_QUERY_CHANGE,
  payload: query,
})