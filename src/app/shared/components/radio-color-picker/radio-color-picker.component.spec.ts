import { RadioColorPickerComponent } from './radio-color-picker.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { Color } from '@app/shared/modules/input-text-area/models';
import { SupportedColors } from '@app/shared/constants';

describe('RadioColorPickerComponent', () => {
  let component: RadioColorPickerComponent;
  let fixture: ComponentFixture<RadioColorPickerComponent>;

  const mockColorData: Color[] = [
    { value: SupportedColors.RED, label: '' },
    { value: SupportedColors.YELLOW, label: '' },
    { value: SupportedColors.GREEN, label: '' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioColorPickerComponent],
      imports: [],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioColorPickerComponent);
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
  });

  describe('selectAndUpdateColor', () => {
    beforeEach(() => {
      const colors = new SimpleChange(null, mockColorData, true);
      component.ngOnChanges({ colors });
    });

    it('should pick a color highlight', () => {
      const HIGHLIGHT_COLOR_INDEX = 1;

      const expectedResult: Color[] = [
        {
          value: SupportedColors.RED,
          label: '',
          className: 'highlight-option-red',
          selected: false
        },
        {
          value: SupportedColors.YELLOW,
          label: '',
          className: 'highlight-option-yellow',
          selected: true
        },
        {
          value: SupportedColors.GREEN,
          label: '',
          className: 'highlight-option-green',
          selected: false
        }
      ];

      component.selectAndUpdateColor(HIGHLIGHT_COLOR_INDEX);

      expect(component.colorsWithClassName).toEqual(expectedResult);
    });

    it('should pick another color and should be only one selected', () => {
      const HIGHLIGHT_YELLOW_INDEX = 1;
      component.selectAndUpdateColor(HIGHLIGHT_YELLOW_INDEX);

      const HIGHLIGHT_RED_INDEX = 0;

      const expectedResult: Color[] = [
        {
          value: SupportedColors.RED,
          label: '',
          className: 'highlight-option-red',
          selected: true
        },
        {
          value: SupportedColors.YELLOW,
          label: '',
          className: 'highlight-option-yellow',
          selected: false
        },
        {
          value: SupportedColors.GREEN,
          label: '',
          className: 'highlight-option-green',
          selected: false
        }
      ];

      component.selectAndUpdateColor(HIGHLIGHT_RED_INDEX);

      expect(component.colorsWithClassName).toEqual(expectedResult);
    });
  });
});
