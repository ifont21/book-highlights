import { createAction, props } from '@ngrx/store';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';
import { ErrorHighlight } from '@app/shared/modules/input-text-area/services/highlighter.service';

export const GetHighlight = createAction('[Highlight] Get');

export const SelectColor = createAction(
  '[Highlight] Select color',
  props<{ payload: string }>()
);

export const SelectFilters = createAction(
  '[Highlight] Select filters',
  props<{ payload: string[] }>()
);

export const UpdateHighlights = createAction(
  '[Highlight] Get Highlights',
  props<{ payload: HighlithedSelection[] }>()
);

export const SetError = createAction(
  '[Highlight] Set error',
  props<{ payload: ErrorHighlight }>()
);
