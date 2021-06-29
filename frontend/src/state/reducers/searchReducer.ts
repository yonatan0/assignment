import { ActionType } from "../action-types";
import { Action } from "../actions";
// payload: {
//   results: string[];
//   page: number | null;
//   totalPages: number | null;
// };
interface SearchState {
  loading: boolean;
  error: string | null;
  term: string;
  results: string[];
  page: number;
  totalPages: number;
  // data: {
  //   term: string;
  //   results: string[];
  //   page: number;
  //   totalPages: number;
  // } | null;
}

const initialState = {
  loading: false,
  error: null,
  term: "",
  results: [],
  page: 0,
  totalPages: 0,
};

const reducer = (
  state: SearchState = initialState,
  action: Action
): SearchState => {
  switch (action.type) {
    case ActionType.SEARCH_DUCKDUCKGO:
      if (state.term === action.payload) {
        return {
          ...state,
          loading: true,
          error: null,
          term: action.payload,
          results: [],
        };
      } else {
        return {
          ...state,
          loading: true,
          error: null,
          term: action.payload,
          results: [],
          page: 0,
          totalPages: 0,
        };
      }
    case ActionType.SEARCH_DUCKDUCKGO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        results: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case ActionType.SEARCH_DUCKDUCKGO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        results: [],
      };
    default:
      return state;
  }
};

export default reducer;
