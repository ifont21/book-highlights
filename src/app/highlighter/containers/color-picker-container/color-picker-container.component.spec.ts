import { TextHighlightFacadeService } from '@app/store/text-highlight-facade.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ColorPickerContainerComponent } from './color-picker-container.component';
import { SupportedColors } from '@app/shared/constants';

describe('ColorPickerContainerComponent', () => {
  let component: ColorPickerContainerComponent;
  let fixture: ComponentFixture<ColorPickerContainerComponent>;
  let store: jasmine.SpyObj<TextHighlightFacadeService>;

  const mockStoreSpy = jasmine.createSpyObj('TextHighlightFacadeService', {
    getSelectedColor: of('red'),
    selectColor: () => {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPickerContainerComponent],
      imports: [],
      providers: [
        { provide: TextHighlightFacadeService, useValue: mockStoreSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(TextHighlightFacadeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should get the color selected', done => {
      component.colorSelected$.subscribe(selected => {
        const expectResult = 'red';
        expect(selected).toBe(expectResult);
        done();
      });
    });

    it('should get the initial possible color with selected', done => {
      const expectedResult = [
        { value: SupportedColors.RED, label: '', selected: true },
        { value: SupportedColors.YELLOW, label: '', selected: false },
        { value: SupportedColors.GREEN, label: '', selected: false }
      ];

      component.initColors$.subscribe(colors => {
        expect(colors).toEqual(expectedResult);
        done();
      });
    });
  });

  describe('getColorSelected', () => {
    it('should dispatch selectFilters to update the state', () => {
      store.selectColor.and.callFake(() => {});
      const expectedParam = 'red';

      component.getColorSelected(expectedParam);
      const expectedCall = store.selectColor;

      expect(expectedCall).toHaveBeenCalledWith(expectedParam);
    });
  });
});
