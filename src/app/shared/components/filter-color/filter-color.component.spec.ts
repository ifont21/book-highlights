import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { FilterColorComponent } from './filter-color.component';
import { Color } from '@app/shared/modules/input-text-area/models';
import { SupportedColors } from '@app/shared/constants';

describe('FilterColorComponent', () => {
  let component: FilterColorComponent;
  let fixture: ComponentFixture<FilterColorComponent>;

  const mockColorData: Color[] = [
    { value: SupportedColors.RED, label: '' },
    { value: SupportedColors.YELLOW, label: '' },
    { value: SupportedColors.GREEN, label: '' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterColorComponent],
      imports: [],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    beforeEach(() => {
      const colors = new SimpleChange(null, mockColorData, true);
      component.ngOnChanges({ colors });
    });

    it('should transform array color into a new array color with classNames color', () => {
      expect(component.colorsWithClassName[0].className).toBe(
        'highlight-option-red'
      );
    });

    it('should color options be initiallized in false as selected', () => {
      const expectedSelectedValues = component.colorsWithClassName.map(
        color => color.selected
      );
      expect(expectedSelectedValues).toEqual([false, false, false]);
    });

    it('should select a color and see all colors filtered', () => {
      const COLOR_YELLOW_INDEX = 1;

      const expectedResult = [
        {
          value: SupportedColors.RED,
          label: '',
          selected: false,
          className: 'highlight-option-red'
        },
        {
          value: SupportedColors.YELLOW,
          label: '',
          selected: true,
          className: 'highlight-option-yellow'
        },
        {
          value: SupportedColors.GREEN,
          label: '',
          selected: false,
          className: 'highlight-option-green'
        }
      ];

      component.selectColorToFilter(COLOR_YELLOW_INDEX);
      expect(component.colorsWithClassName).toEqual(expectedResult);
    });

    it('should select a color after other previous selected', () => {
      const COLOR_RED_INDEX = 0;
      component.selectColorToFilter(COLOR_RED_INDEX);

      const COLOR_YELLOW_INDEX = 1;

      const expectedResult = [
        {
          value: SupportedColors.RED,
          label: '',
          selected: true,
          className: 'highlight-option-red'
        },
        {
          value: SupportedColors.YELLOW,
          label: '',
          selected: true,
          className: 'highlight-option-yellow'
        },
        {
          value: SupportedColors.GREEN,
          label: '',
          selected: false,
          className: 'highlight-option-green'
        }
      ];

      component.selectColorToFilter(COLOR_YELLOW_INDEX);
      expect(component.colorsWithClassName).toEqual(expectedResult);
    });
  });
});
