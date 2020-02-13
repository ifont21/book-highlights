import { TextHighlightFacadeService } from '@app/store/text-highlight-facade.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ColorFilterContainerComponent } from './color-filter-container.component';
import { of } from 'rxjs';

describe('ColorFilterContainerComponent', () => {
  let component: ColorFilterContainerComponent;
  let fixture: ComponentFixture<ColorFilterContainerComponent>;
  let store: jasmine.SpyObj<TextHighlightFacadeService>;

  const mockStoreSpy = jasmine.createSpyObj('TextHighlightFacadeService', [
    'selectFilters'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorFilterContainerComponent],
      imports: [],
      providers: [
        { provide: TextHighlightFacadeService, useValue: mockStoreSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorFilterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(TextHighlightFacadeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getColorFilters', () => {
    it('should dispatch selectFilters to update the state', () => {
      store.selectFilters.and.callFake(() => {});
      const expectedParam = ['red'];

      component.getColorFilters(expectedParam);
      const expectedCall = store.selectFilters;

      expect(expectedCall).toHaveBeenCalledWith(expectedParam);
    });
  });
});
