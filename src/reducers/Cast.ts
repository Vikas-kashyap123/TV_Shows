import { Action } from "../actions";
import { produce } from "immer";
import { normalize, schema } from "normalizr";
import { Cast, Person } from "../models/Cast";
import { CAST_LOADED, LOAD_CAST } from "../actions/Cast";

type normalizeCast = { [personId: number]: Person[] }

export type State = { cast: normalizeCast, loading: boolean };
export const initialState: State = { cast: {}, loading: false };

const castReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case CAST_LOADED:
      return produce(state, (draft) => {
        const cast = action.payload as Cast;
        const castEntity = new schema.Entity("cast");
        const normalizedCast = normalize(cast, [castEntity]);
        draft.cast = normalizedCast.entities.cast! || {};
        draft.loading = false
      });
      case LOAD_CAST: 
      return produce(state, (draft)=> {
        draft.loading = true;
      })
    default:
      return state;
  }
};
export default castReducer;