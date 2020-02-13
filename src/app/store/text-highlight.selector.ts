import { createSelector, createFeatureSelector } from '@ngrx/store';
import TextHighlightState from './text-highlight.state';

export const getTextHighlightState = createFeatureSelector<TextHighlightState>(
  'textHighlight'
);

export const getHighlight = createSelector(
  getTextHighlightState,
  (state: TextHighlightState) => state && state.textHighlight
);

export const getError = createSelector(
  getTextHighlightState,
  (state: TextHighlightState) => state && state.error
);

export const getSelectedColor = createSelector(
  getTextHighlightState,
  (state: TextHighlightState) =>
    state && state.textHighlight && state.textHighlight.selectedColor
);

export const getFilters = createSelector(
  getTextHighlightState,
  (state: TextHighlightState) =>
    state && state.textHighlight && state.textHighlight.filters
);

export const getHighlights = createSelector(
  getTextHighlightState,
  (state: TextHighlightState) =>
    state && state.textHighlight && state.textHighlight.highlights
);
