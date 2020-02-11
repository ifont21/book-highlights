import { HighlighterComponent } from './highlighter.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';
import { SupportedColors } from '@app/shared/constants';

describe('HighlighterComponent', () => {
  let component: HighlighterComponent;
  let fixture: ComponentFixture<HighlighterComponent>;

  const initialColors = [
    { value: SupportedColors.RED, label: '' },
    { value: SupportedColors.YELLOW, label: '' },
    { value: SupportedColors.GREEN, label: '' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighlighterComponent],
      imports: [],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize colors for filters and radio color picker', () => {
    expect(component.colors).toEqual(initialColors);
  });

  describe('getColorSelected', () => {
    it('should get a color to highlight when the function is called', () => {
      component.getColorSelected('red');
      expect(component.selectedColor).toBe('red');
    });
  });

  describe('getSelectionHighlights', () => {
    it('should get the current highlight selection when the function is called', () => {
      const highlights: HighlithedSelection[] = [
        {
          start: 0,
          end: 4,
          text: 'some Text',
          classNameColor: 'highlight-red'
        }
      ];
      component.getSelectionHighlights(highlights);
      expect(component.currentHighlights).toEqual(highlights);
    });
  });

  describe('getColorFilters', () => {
    it('should get the color to filter when the function is called', () => {
      const expectedResult = ['red', 'green'];
      component.getColorFilters(expectedResult);
      expect(component.colorFilters).toEqual(expectedResult);
    });
  });
});
