import { TextHighlight } from './text-highlight.model';
import { ErrorHighlight } from '@app/shared/modules/input-text-area/services/highlighter.service';

export default class TextHighlightState {
  textHighlight: TextHighlight;
  error: ErrorHighlight;
}

export const initializeState = (): TextHighlightState => {
  return {
    textHighlight: {
      filters: [],
      selectedColor: 'red',
      highlights: [],
      text: ''
    },
    error: null
  };
};
