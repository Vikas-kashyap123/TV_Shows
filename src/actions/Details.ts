import { ActionCreator } from ".";
import { Show } from "../models/Show";

export const DETAILS_LOADED = "DETAILS_LOADED";

export const DetailsLoadedAction: ActionCreator<Show[]> = (details: Show[]) => ({
  type: DETAILS_LOADED,
  payload: details,
});

export const LOADING_DETAILS = "LOADING_DETAILS"

export const LoadingDetailsAction: ActionCreator<number> = (id: number) => ({
  type: LOADING_DETAILS,
  payload: id,
});


