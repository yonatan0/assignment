import { ActionType } from "../action-types";
import { Action } from "../actions";
// payload: {
//   results: string[];
//   page: number | null;
//   totalPages: number | null;
// };
interface RecentSearchState {
  loading: boolean;
  error: string | null;
  data: string[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: RecentSearchState = initialState,
  action: Action
): RecentSearchState => {
  switch (action.type) {
    case ActionType.RECENT_SEARCHES:
      return {
        loading: true,
        error: null,
        data: [],
      };
    case ActionType.RECENT_SEARCHES_ADD:
      const recent = [...state.data];
      const index = recent.indexOf(action.payload);
      if (index !== -1) {
        // term exists, move to first
        recent.splice(index, 1);
      }
      recent.unshift(action.payload);
      if (recent.length > 10) {
        recent.pop();
      }
      return {
        loading: false,
        error: null,
        data: [...recent],
      };
    case ActionType.RECENT_SEARCHES_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case ActionType.RECENT_SEARCHES_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;
