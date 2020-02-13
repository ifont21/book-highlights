import TextHighlightState, { initializeState } from './text-highlight.state';
import { createReducer, on, Action } from '@ngrx/store';
import * as actions from './text-highlight.action';

export const initialState = initializeState();

const getHighlightReducer = (state: TextHighlightState): TextHighlightState =>
  state;

const selectColorReducer = (
  state: TextHighlightState,
  { payload }
): TextHighlightState => {
  return {
    ...state,
    textHighlight: { ...state.textHighlight, selectedColor: payload },
    error: { highlighted: null }
  };
};

const selectFiltersReducer = (
  state: TextHighlightState,
  { payload }
): TextHighlightState => {
  return {
    ...state,
    textHighlight: { ...state.textHighlight, filters: payload },
    error: { highlighted: null }
  };
};

const updateHighlightsReducer = (state: TextHighlightState, { payload }) => {
  return {
    ...state,
    textHighlight: { ...state.textHighlight, highlights: payload },
    error: { highlighted: null }
  };
};

const setErrorReducer = (state: TextHighlightState, { payload }) => {
  return {
    ...state,
    error: payload
  };
};

const reducer = createReducer(
  initialState,
  on(actions.GetHighlight, getHighlightReducer),
  on(actions.SelectColor, selectColorReducer),
  on(actions.SelectFilters, selectFiltersReducer),
  on(actions.UpdateHighlights, updateHighlightsReducer),
  on(actions.SetError, setErrorReducer)
);

export function TextHighlightReducer(
  state: TextHighlightState | undefined,
  action: Action
) {
  return reducer(state, action);
}
