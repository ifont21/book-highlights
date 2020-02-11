import { TextAreaDirective } from './../directives/text-area.directive';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TextAreaComponent } from './text-area.component';
import { HighligtherDirective } from '../directives/highligther.directive';
import { TextArea, Highlight, HighLighterState } from '../models';
import { TextAreaService } from '../services/text-area.service';
import { initialState } from '../services/highlighter.service';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;
  let service: jasmine.SpyObj<TextAreaService>;

  const mockTextArea: TextArea = {
    currentValue: 'Hello World How Are You ?',
    currentSelection: {
      start: 0,
      end: 11,
      text: 'Hello World',
      classNameColor: 'highlight-red'
    }
  };

  const mockSelection: Highlight = {
    text: 'Hello World',
    value: 'Hello World How Are You ?',
    selectionStart: 0,
    selectionEnd: 11,
    colorClassName: 'highlight-red'
  };

  const mockHighlightState: HighLighterState = initialState;

  beforeEach(async(() => {
    const textAreaServiceSpy = jasmine.createSpyObj('TextAreaService', {
      getHighlightsOnTextArea: mockTextArea
    });

    TestBed.configureTestingModule({
      declarations: [
        TextAreaComponent,
        HighligtherDirective,
        TextAreaDirective
      ],
      imports: [],
      providers: [{ provide: TextAreaService, useValue: textAreaServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TextAreaService);

    component.highLighterState = mockHighlightState;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onGettingHighlightsSelection', () => {
    it('should get the latest highligh selection detected from Directive', () => {
      component.onGettingHighlightsSelection(mockSelection);

      expect(service.getHighlightsOnTextArea).toHaveBeenCalled();
    });
  });

  describe('onGettingScrollTopTextArea', () => {
    it('should emit an event to the parent when list on scroll change', () => {
      spyOn(component.scrollTop, 'emit').and.callFake(() => {});

      component.onGettingScrollTopTextArea(5);

      expect(component.scrollTop.emit).toHaveBeenCalledWith(5);
    });
  });

  describe('onTextAreaChange', () => {
    it('should emit an event to the parent when list when a text change ocurred', () => {
      spyOn(component.changeValue, 'emit').and.callFake(() => {});

      component.onTextAreaChange('sth');

      expect(component.changeValue.emit).toHaveBeenCalledWith('sth');
    });
  });
});
