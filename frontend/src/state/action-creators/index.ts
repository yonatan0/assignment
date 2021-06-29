import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const searchDuck = (term: string, page: number = 0) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_DUCKDUCKGO,
      payload: term,
    });

    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL as string,
        {
          params: {
            q: term,
            page,
            format: "json",
          },
        }
      );

      let a: Array<any> = [];
      for (let d of data.data) {
        if (!a.includes(d.url)) {
          a.push(d.url);
        }
      }
      dispatch({
        type: ActionType.RECENT_SEARCHES_ADD,
        payload: term,
      });
      dispatch({
        type: ActionType.SEARCH_DUCKDUCKGO_SUCCESS,
        payload: {
          results: data.data,
          page: data.page,
          totalPages: data.totalPages,
        },
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.SEARCH_DUCKDUCKGO_ERROR,
        payload: err.message,
      });
    }
  };
};

export const highlightText = (text: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.HIGHLIGHT_TEXT,
      payload: text,
    });
  };
};
export const highlightTextCounter = (count: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.HIGHLIGHT_TEXT_COUNT,
      payload: count,
    });
  };
};

export const recentSearches = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RECENT_SEARCHES,
    });
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL as string
      );
      dispatch({
        type: ActionType.RECENT_SEARCHES_SUCCESS,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.RECENT_SEARCHES_ERROR,
        payload: err.message,
      });
    }
  };
};
