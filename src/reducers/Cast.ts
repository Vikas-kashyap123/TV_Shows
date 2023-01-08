import { Action } from "../actions";
import { produce } from "immer";
import { normalize, schema } from "normalizr";
import { Cast } from "../models/Cast";
import { CAST_LOADED } from "../actions/Cast";
import { Person } from "../models/Person";

type normalizeCast = { [personId: number]: Person[] }

export type State = { cast: normalizeCast };
export const initialState: State = { cast: {} };

const castReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case CAST_LOADED:
      return produce(state, (draft) => {
        const cast = action.payload as Cast;
        const castEntity = new schema.Entity("cast");
        const data = normalize(cast, [castEntity]);
        draft.cast = data.entities.cast! || {};
      });
    default:
      return state;
  }
};
export default castReducer;