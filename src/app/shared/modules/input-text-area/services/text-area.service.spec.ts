import { initialState } from './highlighter.service';
import { async, TestBed } from '@angular/core/testing';
import { TextAreaService } from './text-area.service';
import { TextArea } from '../models';

describe('TextAreaService', () => {
  let service: jasmine.SpyObj<TextAreaService>;

  const textArea: TextArea = {
    selections: [],
    currentValue: 'hello world',
    currentSelection: {
      start: 6,
      end: 11,
      text: 'world',
      classNameColor: 'highlight-green'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [TextAreaService]
    });
  }));

  beforeEach(() => {
    service = TestBed.get(TextAreaService);
  });

  describe('getHighlightsOnTextArea', () => {
    it('should get the textArea object coming from the mark parse process representing the highlight part', () => {
      const expectedResult = 'hello <mark class="highlight-green">world</mark>';

      const currentState = service.getHighlightsOnTextArea(
        initialState,
        textArea
      );

      expect(currentState.currentValue).toBe(expectedResult);
    });
  });
});
