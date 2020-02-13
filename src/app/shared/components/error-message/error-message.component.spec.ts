import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ErrorMessageComponent } from './error-message.component';
import { ErrorHighlight } from '@app/shared/modules/input-text-area/services/highlighter.service';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  const mockErrorHighlight: ErrorHighlight = { highlighted: 'invalid' };
  const mockNoErrorHighlight: ErrorHighlight = { highlighted: null };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent],
      imports: [],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should get an error when this has gotten', () => {
      const expectedResult =
        'You are Trying to Highlight some words you already did, Please Check';

      const errorHighlight = new SimpleChange(null, mockErrorHighlight, true);
      component.ngOnChanges({ errorHighlight });

      expect(component.errorMessage).toBe(expectedResult);
    });

    it('should get an empty string no errors has ocurred', () => {
      const expectedResult = '';

      const errorHighlight = new SimpleChange(null, mockNoErrorHighlight, true);
      component.ngOnChanges({ errorHighlight });

      expect(component.errorMessage).toBe(expectedResult);
    });
  });
});
