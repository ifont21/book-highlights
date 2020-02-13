import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InputTextAreaComponent } from './input-text-area.component';
import {
  HighlighterService,
  initialState
} from './services/highlighter.service';
import { of } from 'rxjs';
import { HighLighterState, TextArea } from './models';

describe('InputTextAreaComponent', () => {
  let component: InputTextAreaComponent;
  let fixture: ComponentFixture<InputTextAreaComponent>;
  let service: jasmine.SpyObj<HighlighterService>;

  const mockHighlightState: HighLighterState = initialState;

  const highLighertServiceSpy = jasmine.createSpyObj('HighlighterService', {
    getHighlightState: of(mockHighlightState),
    updateSelectionState: () => {},
    validateSelections: { highlighted: null }
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputTextAreaComponent],
      imports: [],
      providers: [
        { provide: HighlighterService, useValue: highLighertServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextAreaComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HighlighterService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transform color className when a color is passed as an Input', () => {
    component.colorHighlights = 'red';

    const expectedResult = 'highlight-red';

    expect(component.colorHighlights).toBe(expectedResult);
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should get current state here', () => {
      expect(service.getHighlightState).toHaveBeenCalled();
    });
  });

  describe('onHighlightsSelections', () => {
    it('should update the current state here when a new change has been emited though an output', () => {
      const expectedParam: TextArea = {
        selections: [],
        currentValue: '',
        currentSelection: {
          start: 0,
          end: 10,
          text: 'Hello World',
          classNameColor: 'highlight-red'
        }
      };

      component.onHighlightsSelections(expectedParam);

      expect(service.updateSelectionState).toHaveBeenCalledWith(expectedParam);
    });
  });

  describe('onGettingScrollTopTextAre', () => {
    it('should store the scrollTop value in a property when scroll event has emitted', () => {
      const expectedResult = 2;

      component.onGettingScrollTopTextAre(expectedResult);

      expect(component.textAreaScrollTop).toBe(expectedResult);
    });
  });

  describe('undoTextAreaChange', () => {
    it('should update the highlight state with the initial state when undo has been emitted', () => {
      const expectedParam = initialState.textArea;

      component.undoTextAreaChange();

      expect(service.updateSelectionState).toHaveBeenCalledWith(expectedParam);
    });
  });

  describe('onListenTextAreaChange', () => {
    it('should update the highlight state with the initial state when a input change delete the whole text area content', () => {
      const expectedParam = initialState.textArea;

      component.onListenTextAreaChange('');

      expect(service.updateSelectionState).toHaveBeenCalledWith(expectedParam);
    });
  });
});
