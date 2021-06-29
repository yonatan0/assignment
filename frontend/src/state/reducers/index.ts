import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import highlightTextReducer from "./highlightTextReducer";
import recentSearchesReducer from "./recentSearchesReducer";

const reducers = combineReducers({
  search: searchReducer,
  highlight: highlightTextReducer,
  recentSearches: recentSearchesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
