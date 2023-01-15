import { Action } from "../actions";
import { produce } from "immer";
import { normalize, schema } from "normalizr";
import { Cast, Person } from "../models/Cast";
import { CAST_LOADED, LOAD_CAST } from "../actions/Cast";
import { SHOWS_LOADED } from "../actions/show";

type normalizePerson = { [personId: number]: Person };
type normalizeCast = { [ShowId: number]: Cast };

export type State = {
  cast: normalizeCast;
  loading: boolean;
  person: normalizePerson;
};

export const initialState: State = {
  cast: {},
  person: {},
  loading: false,
};

const castReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case CAST_LOADED:
      return produce(state, (draft) => {
        const cast = action.payload as Cast[];
        const castEntity = new schema.Entity("cast");
        const normalizedCast = normalize(cast, [castEntity]);
        draft.person = normalizedCast.entities.cast! || {};
        draft.loading = false;
      });
    case SHOWS_LOADED:
      return produce(state, (draft) => {
        const castsArr = action.payload.map((i: any) => i.cast);
        const castEntity = new schema.Entity("cast");
        const normalizeCast = normalize(castsArr, [castEntity]);
        draft.cast = normalizeCast.entities.cast! || {};
      });
    case LOAD_CAST:
      return produce(state, (draft) => {
        draft.loading = true;
      });
    default:
      return state;
  }
};
export default castReducer;
