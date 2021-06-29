import { ActionType } from "../action-types";

interface SearchDuckduckgoAction {
  type: ActionType.SEARCH_DUCKDUCKGO;
  payload: string;
}

interface SearchDuckduckgoSuccessAction {
  type: ActionType.SEARCH_DUCKDUCKGO_SUCCESS;
  // payload: string[];
  payload: {
    results: string[];
    page: number;
    totalPages: number;
  };
}

interface SearchDuckduckgoErrorAction {
  type: ActionType.SEARCH_DUCKDUCKGO_ERROR;
  payload: string;
}

interface HighlightTextAction {
  type: ActionType.HIGHLIGHT_TEXT;
  payload: string;
}
interface HighlightTextCountAction {
  type: ActionType.HIGHLIGHT_TEXT_COUNT;
  payload: number;
}

interface RecentSearchesAction {
  type: ActionType.RECENT_SEARCHES;
}
interface RecentSearchesAddAction {
  type: ActionType.RECENT_SEARCHES_ADD;
  payload: string;
}
interface RecentSearchesSuccessAction {
  type: ActionType.RECENT_SEARCHES_SUCCESS;
  // payload: string[];
  payload: string[];
}

interface RecentSearchesErrorAction {
  type: ActionType.RECENT_SEARCHES_ERROR;
  payload: string;
}
export type Action =
  | SearchDuckduckgoAction
  | SearchDuckduckgoSuccessAction
  | SearchDuckduckgoErrorAction
  | HighlightTextAction
  | HighlightTextCountAction
  | RecentSearchesAction
  | RecentSearchesAddAction
  | RecentSearchesSuccessAction
  | RecentSearchesErrorAction;
