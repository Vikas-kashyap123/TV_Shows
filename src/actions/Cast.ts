import { ActionCreator } from ".";
import { Cast } from "../models/Cast";

export const CAST_LOADED = "CAST_LOADED";

export const CastLoadedAction:ActionCreator<Cast[]> = (cast: Cast[])=> ({
    type: CAST_LOADED,
    payload: cast
})

export const LOAD_CAST = "LOAD_CAST";

export const LoadCastAction: ActionCreator<number> = (id:number)=> ({
    type: LOAD_CAST,
    payload: id,
})