import { async, TestBed } from '@angular/core/testing';
import {
  HighlighterService,
  initialState,
  ErrorHighlight
} from './highlighter.service';
import { TextArea } from '../models';

describe('HighlighterService', () => {
  let service: jasmine.SpyObj<HighlighterService>;

  const mockErrorHighlight: ErrorHighlight = { highlighted: 'invalid' };
  const mockNoErrorHighlight: ErrorHighlight = { highlighted: null };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [HighlighterService]
    });
  }));

  beforeEach(() => {
    service = TestBed.get(HighlighterService);
  });

  describe('getHighlightState', () => {
    it('should get initial state ', done => {
      service.getHighlightState().subscribe(state => {
        expect(state).toEqual(initialState);
        done();
      });
    });

    it('should update current state when a new change is emitter', done => {
      const textArea: TextArea = {
        selections: [],
        currentValue: 'Text hereeeeee',
        currentSelection: {
          start: 0,
          end: 10,
          text: 'Hello World',
          classNameColor: 'highlight-red'
        }
      };
      service.updateSelectionState(textArea);

      service.getHighlightState().subscribe(state => {
        expect(state).toEqual({ textArea });
        done();
      });
    });
  });

  describe('validateSelections', () => {
    beforeEach(() => {
      const mockPreviousSelections: TextArea = {
        selections: [
          {
            start: 0,
            end: 5,
            text: 'Hello',
            classNameColor: 'highlight-red'
          }
        ],
        currentValue: 'Hello World',
        currentSelection: {}
      };

      service.updateSelectionState(mockPreviousSelections);
    });

    it('should send an error when current hightlight is overlapping one of the previous', () => {
      const textArea: TextArea = {
        selections: [],
        currentValue: 'Hello World',
        currentSelection: {
          start: 0,
          end: 10,
          text: 'Hello World',
          classNameColor: 'highlight-red'
        }
      };

      const error = service.validateSelections(textArea);
      expect(error).toEqual(mockErrorHighlight);
    });

    it('should send no error when current hightlight is not overlapping one of the previous', () => {
      const textArea: TextArea = {
        selections: [],
        currentValue: 'Hello World',
        currentSelection: {
          start: 6,
          end: 10,
          text: 'orld',
          classNameColor: 'highlight-red'
        }
      };

      const error = service.validateSelections(textArea);
      expect(error).toEqual(mockNoErrorHighlight);
    });
  });
});
