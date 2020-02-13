import { ErrorHighlight } from '@app/shared/modules/input-text-area/services/highlighter.service';
import { TextHighlightFacadeService } from '@app/store/text-highlight-facade.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { TextAreaHighlightContainerComponent } from './text-area-highlight-container.component';
import { HighlithedSelection } from '@app/shared/modules/input-text-area/models';

describe('TextAreaHighlightContainerComponent', () => {
  let component: TextAreaHighlightContainerComponent;
  let fixture: ComponentFixture<TextAreaHighlightContainerComponent>;
  let store: jasmine.SpyObj<TextHighlightFacadeService>;

  const mockErrorHighlight: ErrorHighlight = { highlighted: 'invalid' };

  const mockHighlights: HighlithedSelection[] = [
    {
      start: 0,
      end: 5,
      text: 'hello',
      classNameColor: ''
    }
  ];

  const mockStoreSpy = jasmine.createSpyObj('TextHighlightFacadeService', {
    getSelectedColor: of('green'),
    getError: of(mockErrorHighlight),
    updateHighlights: () => {},
    setError: () => {}
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextAreaHighlightContainerComponent],
      imports: [],
      providers: [
        { provide: TextHighlightFacadeService, useValue: mockStoreSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaHighlightContainerComponent);
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

    it('should get the color selected to highlight', done => {
      component.color$.subscribe(selected => {
        const expectResult = 'green';

        expect(selected).toEqual(expectResult);
        done();
      });
    });

    it('should be able to get an error', done => {
      component.errorHighlight$.subscribe(error => {
        const expectResult = mockErrorHighlight;

        expect(error).toEqual(expectResult);
        done();
      });
    });
  });

  describe('getSelectionHighlights', () => {
    it('should dispatch getSelectionHighlights to update the state', () => {
      store.updateHighlights.and.callFake(() => {});
      const expectedParam = mockHighlights;

      component.getSelectionHighlights(expectedParam);
      const expectedCall = store.updateHighlights;

      expect(expectedCall).toHaveBeenCalledWith(expectedParam);
    });
  });

  describe('getErrorHighlight', () => {
    it('should dispatch selectFilters to update the state', () => {
      store.setError.and.callFake(() => {});
      const expectedParam = mockErrorHighlight;

      component.getErrorHighlight(expectedParam);
      const expectedCall = store.setError;

      expect(expectedCall).toHaveBeenCalledWith(expectedParam);
    });
  });
});
