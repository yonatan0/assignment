import { ActionType } from "../action-types";
import { Action } from "../actions";

interface HighlightTextState {
  text: string;
  counter: number;
}

const initialState = {
  text: "",
  counter: 0,
};

const reducer = (
  state: HighlightTextState = initialState,
  action: Action
): HighlightTextState => {
  switch (action.type) {
    case ActionType.HIGHLIGHT_TEXT:
      return { text: action.payload, counter: 0 };
    case ActionType.HIGHLIGHT_TEXT_COUNT:
      return { text: state.text, counter: state.counter + action.payload };
    default:
      return state;
  }
};

export default reducer;
