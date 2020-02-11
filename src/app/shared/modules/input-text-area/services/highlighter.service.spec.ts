import {
  async,
  TestBed
} from '@angular/core/testing';
import { HighlighterService, initialState } from './highlighter.service';
import { TextArea } from '../models';

describe('HighlighterService', () => {
  let service: jasmine.SpyObj<HighlighterService>;

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
});
